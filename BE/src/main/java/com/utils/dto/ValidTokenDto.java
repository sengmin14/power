package com.utils.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ValidTokenDto {
    private boolean valid;
    private String errorName;
    
    public static ValidTokenDto valid() {
        return new ValidTokenDto(true, null);
    }
    
    public static ValidTokenDto invalid(String errorName) {
        return new ValidTokenDto(false, errorName);
    }
}


