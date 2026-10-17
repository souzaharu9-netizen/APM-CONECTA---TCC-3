package br.itb.projeto.pizzaria.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.pizzaria.config.BusinessException;
import br.itb.projeto.pizzaria.config.ResourceNotFoundException;
import br.itb.projeto.pizzaria.dto.UsuarioDTO;
import br.itb.projeto.pizzaria.model.entity.Usuario;
import br.itb.projeto.pizzaria.model.repository.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /* ================= LOGIN ================= */
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (!"ATIVO".equals(usuario.getStatusUsuario())) {
            throw new DisabledException("Usuário inativo ou precisa trocar senha");
        }

        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .roles(usuario.getNivelAcesso())
                .build();
    }

    /* ================= CREATE ================= */
    public Usuario create(Usuario usuario) {
        validarUsuarioParaCriacao(usuario);

        Usuario usuarioCriacao = new Usuario();
        usuarioCriacao.setNome(usuario.getNome());
        usuarioCriacao.setUsername(usuario.getUsername());
        usuarioCriacao.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuarioCriacao.setNivelAcesso(usuario.getNivelAcesso());
        usuarioCriacao.setStatusUsuario("ATIVO");
        usuarioCriacao.setDataCadastro(LocalDateTime.now());
        usuarioCriacao.setDataAtualizacao(LocalDateTime.now());

        return usuarioRepository.save(usuarioCriacao);
    }

    /**
     * Valida os dados antes de criar um novo usuário.
     * Previne credenciais vazias, username duplicado e regras de negócio.
     */
    private void validarUsuarioParaCriacao(Usuario usuario) {
        if (usuario.getNome() == null || usuario.getNome().isBlank()) {
            throw new BusinessException("O campo 'nome' é obrigatório.");
        }
        if (usuario.getUsername() == null || usuario.getUsername().isBlank()) {
            throw new BusinessException("O campo 'username' é obrigatório.");
        }
        if (usuario.getPassword() == null || usuario.getPassword().length() < 6) {
            throw new BusinessException("A senha deve ter no mínimo 6 caracteres.");
        }
        if (usuario.getNivelAcesso() == null
                || (!"ADMIN".equals(usuario.getNivelAcesso())
                        && !"USER".equals(usuario.getNivelAcesso()))) {
            throw new BusinessException("Nível de acesso inválido. Use 'ADMIN' ou 'USER'.");
        }

        // Verifica se username já existe (duplicado)
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new BusinessException("Já existe um usuário cadastrado com este username.");
        }
    }


    /* ================= EDITAR ================= */
    public Usuario editar(MultipartFile file, Long id, Usuario usuario) {

        Usuario _usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        _usuario.setNome(usuario.getNome());
        _usuario.setNivelAcesso(usuario.getNivelAcesso());
        _usuario.setDataAtualizacao(LocalDateTime.now());

        if (file != null && file.getSize() > 0) {
            try {
                _usuario.setFoto(file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Erro ao processar a foto do usuário", e);
            }
        }

        return usuarioRepository.save(_usuario);
    }

    /* ================= ALTERAR SENHA ================= */
    public Usuario alterarSenha(Long id, String novaSenha) {
        Usuario _usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        _usuario.setPassword(passwordEncoder.encode(novaSenha));
        _usuario.setStatusUsuario("ATIVO");
        _usuario.setDataAtualizacao(LocalDateTime.now());

        return usuarioRepository.save(_usuario);
    }

    /* ================= INATIVAR ================= */
    public Usuario inativar(Long id) {
        Usuario _usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        _usuario.setStatusUsuario("INATIVO");
        _usuario.setDataAtualizacao(LocalDateTime.now());
        return usuarioRepository.save(_usuario);
    }

    /* ================= ATIVAR ================= */
    public Usuario ativar(Long id) {
        Usuario _usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        _usuario.setStatusUsuario("ATIVO");
        _usuario.setDataAtualizacao(LocalDateTime.now());
        return usuarioRepository.save(_usuario);
    }

    public UsuarioDTO findByUsername(Authentication authentication) {
        Usuario usuario = usuarioRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        return toDTO(usuario);
    }

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public UsuarioDTO findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        return toDTO(usuario);
    }

    private UsuarioDTO toDTO(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getUsername(),
                usuario.getNivelAcesso(),
                usuario.getDataCadastro(),
                usuario.getStatusUsuario()
        );
    }
}
