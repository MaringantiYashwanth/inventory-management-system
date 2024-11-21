package com.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;

@Service
public class ProductService {
	private final ProductRepository productRepository;

	@Autowired
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	public Optional<Product> getProductById(Long id) {
		return productRepository.findById(id);
	}

	public Product createProduct(Product product) {
		return productRepository.save(product);
	}
	
	public Product createProductById(Long id, Product productDetails) {
		productDetails.setId(id);
		return productRepository.save(productDetails);
	}
	public Product updateProduct(Long id, Product productDetails) {
		return productRepository.findById(id).map(product -> {
			product.setName(product.getName());
			product.setDescription(product.getDescription());
			product.setPrice(product.getPrice());
			product.setQuantity(product.getQuantity());
			return productRepository.save(product);
		}).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
	}

	public void deleteProduct(Long id) {
		productRepository.deleteById(id);
	}
}
