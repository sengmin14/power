package com.utils;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.catchMind.user.dto.UserDto;
import com.utils.dto.ValidTokenDto;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

/**
 * JWT의 구성요소를 생성하고 최종적으로 JWT를 생성하여 유효성을 체크하는 유틸입니다.
 *
 * @author lee
 * @fileName TokenUtils
 * @since : 10/1/24
 */
@Log4j2
@Component
public class TokenUtils {

    private static SecretKey JWT_SECRET_KEY;

    /**
     * JWT_SECRET_KEY 변수값에 환경 변수에서 불러온 SECRET_KEY를 주입합니다.
     *
     * @param jwtSecretKey
     */
    public TokenUtils(@Value("${jwt.secret}") String jwtSecretKey) {
        TokenUtils.JWT_SECRET_KEY = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }


    /**
     * '토큰의 만료기간'
     *
     * @return {Date} Calendar
     */
    private static Date createExpiredDate() {
        Calendar c = Calendar.getInstance();
//        c.add(Calendar.SECOND, 3);        // 10초
        c.add(Calendar.HOUR, 1);             // 1시간
        // c.add(Calendar.HOUR, 8);             // 8시간
        // c.add(Calendar.DATE, 1);             // 1일
        return c.getTime();
    }

    /**
     * JWT의 '헤더' 값을 생성
     *
     * @return HashMap<String, Object>
     */
    private static Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    /**
     * '사용자 정보' 기반으로 'Claims' 생성
     * @param userDto 사용자 정보
     * @return Map<String, Object>
     */
    private static Map<String, Object> createClaims(UserDto userDto) {
        // 공개 클레임에 사용자의 이름과 이메일을 설정하여 정보를 조회할 수 있다.
        Map<String, Object> claims = new HashMap<>();

        log.info("email :" + userDto.getEmail());
        log.info("nickname :" + userDto.getNickname());
        log.info("userId: " + userDto.getUserId());

        claims.put("email", userDto.getEmail());
        claims.put("nickname", userDto.getNickname());
        claims.put("userId", userDto.getUserId());
        return claims;
    }



    /**
     * 사용자 정보를 기반으로 토큰을 생성하여 반환
     *
     * @param userDto UserDto : 사용자 정보
     * @return String : 토큰
     */
    public static String generateJwt(UserDto userDto) {
        log.debug("생성된 JWT Secret Key: " + JWT_SECRET_KEY);
        // 사용자 시퀀스를 기준으로 JWT 토큰을 발급하여 반환해줍니다.
        JwtBuilder builder = Jwts.builder()
                .setHeader(createHeader())                              // Header 구성
                .setClaims(createClaims(userDto))                       // Payload - Claims 구성
                .setSubject(String.valueOf(userDto.getUserId()))        // Payload - Subject 구성
                .signWith(JWT_SECRET_KEY)                               // Signature 구성
                .setExpiration(createExpiredDate());                    // Expired Date 구성
        return builder.compact();
    }


    /**
     * Refresh Token으로 기간을 14일로 지정
     *
     * @return
     */
    private static Date createRefreshTokenExpiredDate() {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DATE, 14);
        return c.getTime();
    }

    public static String generateRefreshToken(UserDto userDto) {

        log.debug("JWT Secret Key: " + JWT_SECRET_KEY);
        return Jwts.builder()
                .setHeader(createHeader())
                .setClaims(createClaims(userDto))
                .setSubject(String.valueOf(userDto.getUserId()))
                .signWith(JWT_SECRET_KEY)
                .setExpiration(createRefreshTokenExpiredDate())
                .compact();
    }


    /**
     * 'Header' 내에서 'Token' 정보를 반환
     *
     * @param header 헤더
     * @return String
     */
    public static String getHeaderToToken(String header) {
        return header.split(" ")[1];
    }


    /**
     * 'JWT' 내에서 'Claims' 정보를 반환
     *
     * @param token : 토큰
     * @return Claims : Claims
     */

    private static Claims getTokenToClaims(String token) {
        System.out.println("확인111  : " + token);
        System.out.println("확인222  : " + JWT_SECRET_KEY);
        return Jwts.parserBuilder()
                .setSigningKey(JWT_SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 'Claims' 내에서 '사용자 아이디'를 반환
     *
     * @param token : 토큰
     * @return String : 사용자 아이디
     */
    public static String getClaimsToUserId(String token) {
        Claims claims = getTokenToClaims(token);
        return claims.get("userId").toString();
    }

    /**
     * 토큰의 유효성을 검증하고 결과를 ValidTokenDto로 반환
     *
     * @param token : 토큰
     * @return ValidTokenDto : 유효성 검증 결과
     */
    public static ValidTokenDto isValidToken(String token) {
        try {
            Claims claims = getTokenToClaims(token);
            log.info("expireTime :" + claims.getExpiration());
            log.info("email :" + claims.get("email"));
            log.info("nickname :" + claims.get("nickname"));
            log.info("userId :" + claims.get("userId"));
            return com.utils.dto.ValidTokenDto.valid();
        } catch (ExpiredJwtException exception) {
            log.debug("token expired " + token);
            log.error("Token Expired" + exception);
            return com.utils.dto.ValidTokenDto.invalid("TOKEN_EXPIRED");
        } catch (JwtException exception) {
            log.debug("token expired " + token);
            log.error("Token Tampered" + exception);
            return com.utils.dto.ValidTokenDto.invalid("TOKEN_INVALID");
        } catch (NullPointerException exception) {
            log.debug("token expired " + token);
            log.error("Token is null" + exception);
            return com.utils.dto.ValidTokenDto.invalid("TOKEN_NULL");
        }
    }

    /**
     * 토큰에서 UserDto 정보를 추출
     *
     * @param token : 토큰
     * @param isRefreshToken : 리프레시 토큰 여부
     * @return UserDto : 사용자 정보
     */
    public static UserDto getClaimsToUserDto(String token, boolean isRefreshToken) {
        Claims claims = getTokenToClaims(token);
        UserDto userDto = new UserDto();
        userDto.setUserId(Long.parseLong(claims.get("userId").toString()));
        userDto.setEmail(claims.get("email").toString());
        userDto.setNickname(claims.get("nickname").toString());
        return userDto;
    }

    /**
     * Cookie에서 토큰을 추출하는 메서드
     *
     * @param request HttpServletRequest
     * @param cookieName Cookie 이름
     * @return 토큰 문자열
     */
    public static String getTokenFromCookie(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public static UserDto getClaimsToAllUserDto(String token, boolean isRefreshToken) {
        Claims claims = getTokenToClaims(token);
        UserDto userDto = new UserDto();

       
        System.out.println("### Claims 내용: " + claims);

        // test
        userDto.setLoginId("test");

        // userDto.setUserId(Long.parseLong(claims.get("userId").toString()));
        // userDto.setLoginId(claims.get("loginId").toString());
        // userDto.setNickname(claims.get("nickname").toString());
        // userDto.setEmail(claims.get("email").toString());
        // userDto.setRole(UserDto.Role.valueOf(claims.get("role").toString()));
        // userDto.setCreatedAt(LocalDateTime.parse(claims.get("createdAt").toString()));
        return userDto;
    }
}