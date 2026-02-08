package com.catchMind.user.service;

import com.catchMind.user.dto.UserDto;
import com.catchMind.user.entity.User;
import com.catchMind.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * 회원가입
     */
    @Transactional
    public UserDto signup(UserDto signupDto) {
        // 중복 체크
        if (userRepository.existsByLoginId(signupDto.getLoginId())) {
            throw new RuntimeException("이미 존재하는 로그인 ID입니다.");
        }
        if (userRepository.existsByNickname(signupDto.getNickname())) {
            throw new RuntimeException("이미 존재하는 닉네임입니다.");
        }

        String encodedPassword = passwordEncoder.encode(signupDto.getPassword());

        User user = User.builder()
                .loginId(signupDto.getLoginId())
                .nickname(signupDto.getNickname())
                .email(signupDto.getEmail())
                .password(encodedPassword)
                .role(signupDto.getRole() != null ? signupDto.getRole() : UserDto.Role.USER)
                .build();

        User savedUser = userRepository.save(user);
        log.info("회원가입 성공: userId={}, loginId={}", savedUser.getUserId(), savedUser.getLoginId());

        return savedUser.toDto();
    }

    /**
     * 로그인
     */
    @Transactional(readOnly = true)
    public UserDto login(String loginId, String password) {
        // 사용자 조회
        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 로그인 ID입니다."));

        // 비밀번호 확인
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        log.info("로그인 성공: userId={}, loginId={}", user.getUserId(), user.getLoginId());
        return user.toDto();
    }

    /**
     * 로그인 ID 중복 확인
     */
    @Transactional(readOnly = true)
    public boolean checkLoginId(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    /**
     * 닉네임 중복 확인
     */
    @Transactional(readOnly = true)
    public boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}
