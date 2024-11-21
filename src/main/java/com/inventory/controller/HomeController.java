package com.inventory.controller;

import java.time.Year;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("/")
	public String index(Model model) {
		model.addAttribute("welcomeMessage", "Welcome to Your Inventory Management System");
		model.addAttribute("menu", Map.of("dashboard", "Dashboard", "products", "Products", "categories", "Categories",
				"orders", "Orders", "profile", "Profile"));
		model.addAttribute("currentYear", Year.now().getValue());
		return "index";
	}

	@GetMapping("/products")
	public String products(Model model) {
		model.addAttribute("menu", Map.of("dashboard", "Dashboard", "products", "Products", "categories", "Categories",
				"orders", "Orders", "profile", "Profile"));
		model.addAttribute("currentYear", Year.now().getValue());
		return "products";
	}
	
	@GetMapping("/categories")
	public String categories(Model model) {
		return "categories";
	}
	
	@GetMapping("/orders")
	public String orders(Model model) {
		return "orders";
	}
	
	@GetMapping("/profile")
	public String profile(Model model) {
		return "profile";
	}
}
