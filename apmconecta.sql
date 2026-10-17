
CREATE DATABASE apm_conecta
USE apm_conecta;

-- 1. TIPOS DE USUARIO
CREATE TABLE TIPO_USUARIO (
    id_tipo_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nome_tipo VARCHAR(50) NOT NULL UNIQUE
);
GO

-- 2. INSTITUICOES
CREATE TABLE INSTITUICAO (
    id_instituicao INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo_instituicao VARCHAR(30) NOT NULL DEFAULT 'Escola'
);
GO

-- 3. USUARIOS
CREATE TABLE USUARIO (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    id_tipo_usuario INT NOT NULL,
    id_instituicao INT NOT NULL,

    FOREIGN KEY (id_tipo_usuario)
        REFERENCES TIPO_USUARIO(id_tipo_usuario),

    FOREIGN KEY (id_instituicao)
        REFERENCES INSTITUICAO(id_instituicao)
);
GO

-- 4. CAMPANHAS
CREATE TABLE CAMPANHA (
    id_campanha INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(MAX) NOT NULL,
    meta_arrecadacao DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Planejada',
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    id_instituicao INT NOT NULL,

    CHECK (meta_arrecadacao > 0),
    CHECK (data_fim >= data_inicio),
    CHECK (status IN (
        'Planejada', 'Ativa', 'Concluida', 'Cancelada'
    )),

    FOREIGN KEY (id_instituicao)
        REFERENCES INSTITUICAO(id_instituicao)
);
GO

-- 5. DOACOES
CREATE TABLE DOACAO (
    id_doacao INT IDENTITY(1,1) PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    data_doacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    status VARCHAR(20) NOT NULL DEFAULT 'Pendente',
    id_usuario INT NOT NULL,
    id_campanha INT NOT NULL,

    CHECK (valor > 0),
    CHECK (status IN (
        'Pendente', 'Confirmada', 'Cancelada'
    )),

    FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario),

    FOREIGN KEY (id_campanha)
        REFERENCES CAMPANHA(id_campanha)
);
GO

-- 6. SUGESTOES
CREATE TABLE SUGESTAO (
    id_sugestao INT IDENTITY(1,1) PRIMARY KEY,
    descricao VARCHAR(MAX) NOT NULL,
    data_envio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    status VARCHAR(20) NOT NULL DEFAULT 'Pendente',
    id_usuario INT NOT NULL,

    CHECK (status IN (
        'Pendente', 'Em analise', 'Respondida', 'Arquivada'
    )),

    FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario)
);
GO

-- 7. RESPOSTAS AS SUGESTOES
CREATE TABLE RESPOSTA_SUGESTAO (
    id_resposta INT IDENTITY(1,1) PRIMARY KEY,
    resposta VARCHAR(MAX) NOT NULL,
    data_resposta DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    id_sugestao INT NOT NULL,
    id_usuario INT NOT NULL,

    FOREIGN KEY (id_sugestao)
        REFERENCES SUGESTAO(id_sugestao),

    FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario)
);
GO

-- 8. NOTIFICACOES
CREATE TABLE NOTIFICACAO (
    id_notificacao INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    mensagem VARCHAR(MAX) NOT NULL,
    data_envio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    lida BIT NOT NULL DEFAULT 0,
    id_usuario INT NOT NULL,

    FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario)
);
GO

-- 9. MELHORIAS NA INFRAESTRUTURA
CREATE TABLE MELHORIA (
    id_melhoria INT IDENTITY(1,1) PRIMARY KEY,
    descricao VARCHAR(MAX) NOT NULL,
    valor_utilizado DECIMAL(10,2) NOT NULL DEFAULT 0,
    data_registro DATE NOT NULL,
    id_instituicao INT NOT NULL,

    CHECK (valor_utilizado >= 0),

    FOREIGN KEY (id_instituicao)
        REFERENCES INSTITUICAO(id_instituicao)
);
GO

-- 10. RELACAO ENTRE DOACOES E MELHORIAS
CREATE TABLE DOACAO_MELHORIA (
    id_doacao INT NOT NULL,
    id_melhoria INT NOT NULL,
    valor_destinado DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (id_doacao, id_melhoria),
    CHECK (valor_destinado > 0),

    FOREIGN KEY (id_doacao)
        REFERENCES DOACAO(id_doacao),

    FOREIGN KEY (id_melhoria)
        REFERENCES MELHORIA(id_melhoria)
);
GO

-- 11. VIEW: TOTAL ARRECADADO POR CAMPANHA
CREATE OR ALTER VIEW VW_ARRECADACAO_CAMPANHA AS
SELECT
    c.id_campanha,
    c.nome AS campanha,
    c.meta_arrecadacao,
    COALESCE(
        SUM(
            CASE
                WHEN d.status = 'Confirmada'
                    THEN d.valor
                ELSE 0
            END
        ), 0
    ) AS valor_arrecadado
FROM CAMPANHA AS c
LEFT JOIN DOACAO AS d
    ON c.id_campanha = d.id_campanha
GROUP BY
    c.id_campanha,
    c.nome,
    c.meta_arrecadacao;
GO

-- =========================================
-- TESTE DA VIEW
-- =========================================
SELECT * FROM VW_ARRECADACAO_CAMPANHA;
GO

SELECT * FROM TIPO_USUARIO;

SELECT * FROM INSTITUICAO;

SELECT * FROM USUARIO;

SELECT * FROM CAMPANHA;

SELECT * FROM DOACAO;

SELECT * FROM SUGESTAO;

SELECT * FROM RESPOSTA_SUGESTAO;

SELECT * FROM NOTIFICACAO;

SELECT * FROM MELHORIA;

SELECT * FROM DOACAO_MELHORIA;

-- CONSULTAR O TOTAL ARRECADADO POR CAMPANHA
SELECT * FROM VW_ARRECADACAO_CAMPANHA;