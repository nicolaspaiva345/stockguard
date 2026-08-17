package com.nicolas.stockguard.repository;

import com.nicolas.stockguard.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}