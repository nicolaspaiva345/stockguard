package com.nicolas.stockguard;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "JWT_SECRET=test-secret-key-for-tests-123456789")
class StockguardApplicationTests {

	@Test
	void contextLoads() {
	}
}