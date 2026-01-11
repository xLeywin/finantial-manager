package com.wendellyv.financialmanager.enums;

public enum ExpenseStatus {
    PAID(1),
    PENDING(2),
    SCHEDULED(3),
    DELAYED(4);

    private int code;

    ExpenseStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static ExpenseStatus getByCode(int code) {
        for (ExpenseStatus e : ExpenseStatus.values()) {
            if (e.getCode() == code) {
                return e;
            }
        }
        throw new IllegalArgumentException(code + "is an invalid code for ExpenseStatus.");
    }
}
