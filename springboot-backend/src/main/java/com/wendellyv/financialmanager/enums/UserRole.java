package com.wendellyv.financialmanager.enums;

public enum UserRole {
    ADMIN(1),
    USER(2);

    private int code;

    UserRole(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static UserRole getByCode(int code) {
        for (UserRole i : UserRole.values()) {
            if (i.getCode() == code) {
                return i;
            }
        }
        throw new IllegalArgumentException(code + "is an invalid code for UserRole.");
    }
}