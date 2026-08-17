package com.nicolas.stockguard.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class ProductRequest {

    @NotBlank
    private String name;
    @DecimalMin(value = "0.01")
    private BigDecimal price;
    @Min(0)
    private Integer quantity;

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getQuantity() {
        return quantity;
    }

}
