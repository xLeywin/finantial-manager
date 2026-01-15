package com.wendellyv.financialmanager.enums;

public enum Category {
    SALARY(1),
    BONUS(2),
    WORK(3),
    FOOD(4),
    TRANSPORT(5),
    FUEL(6),
    HOUSING(7),
    UTILITIES(8),
    HEALTH(9),
    EDUCATION(10),
    ENTERTAINMENT(11),
    OTHER(12);

    private int code;

    Category(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static Category getByCode(int code) {
        for (Category e : Category.values()) {
            if (e.getCode() == code) {
                return e;
            }
        }
        throw new IllegalArgumentException(code + "is an invalid code for Category.");
    }
}