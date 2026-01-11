package com.wendellyv.financialmanager.enums;

public enum IncomeStatus {
    RECEIVED(1),
    PENDING(2),
    SCHEDULED(3),
    DELAYED(4);

    private int code;

    IncomeStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static IncomeStatus getByCode(int code) {
        for (IncomeStatus i : IncomeStatus.values()) {
            if (i.getCode() == code) {
                return i;
            }
        }
        throw new IllegalArgumentException(code + "is an invalid code for IncomeStatus.");
    }
}
