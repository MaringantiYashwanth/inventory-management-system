// src/main/resources/static/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('productForm');
	const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
	const notification = document.getElementById('notification');
	if (!form || !productsTable || !notification) {
		console.error('Form or Products Table or Notification not found in the document.');
		return;
	}

	async function fetchProducts() {
		try {
			const response = await fetch('/api/products');
			if (!response.ok) throw new Error('Network response was not ok');
			const data = await response.json();
			console.log('Fetched products:', data); // Debugging line
			renderTable(data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	}

	function renderTable(products) {
		productsTable.innerHTML = '';
		products.forEach(product => {
			addProductToTable(product);
		});
	}

	function addProductToTable(product) {
		let row = productsTable.insertRow();
		row.insertCell(0).textContent = product.id;
		row.insertCell(1).textContent = product.name;
		row.insertCell(2).textContent = product.description;
		row.insertCell(3).textContent = product.price;
		row.insertCell(4).textContent = product.quantity;

		const actionCell = row.insertCell(5);
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.className = 'btn btn-edit btn-sm';
		editButton.addEventListener('click', () => editProduct(product, row));
		actionCell.appendChild(editButton);

		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'btn btn-delete btn-sm';
		deleteButton.addEventListener('click', () => deleteProduct(product.id, row));
		actionCell.appendChild(deleteButton);
	}

	function showNotification() {
		notification.style.display = 'block';
		setTimeout(() => {
			notification.style.display = 'none';
		}, 2000);
	}
	form.addEventListener('submit', async function(event) {
		event.preventDefault();

		let newProduct = {
			name: form.name.value,
			description: form.description.value,
			price: parseFloat(form.price.value),
			quantity: parseInt(form.quantity.value)
		};

		try {
			const response = await fetch('/api/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newProduct)
			});

			if (!response.ok) throw new Error('Network response was not ok');

			const data = await response.json();
			console.log('Added product:', data); // Debugging line
			addProductToTable(data); // Add the new product to the table
			showNotification("Product Added successfully");
		} catch (error) {
			console.error('Error adding product:', error);
		}

		form.reset();
	});

	async function editProduct(product, row) {
		const nameCell = row.cells[1];
		const descriptionCell = row.cells[2];
		const priceCell = row.cells[3];
		const quantityCell = row.cells[4];
		const nameInput = document.createElement('input');
		nameInput.type = 'text';
		nameInput.value = product.name;
		nameCell.textContent = '';
		nameCell.appendChild(nameInput);
		const descriptionInput = document.createElement('input');
		descriptionInput.type = 'text';
		descriptionInput.value = product.description;
		descriptionCell.textContent = '';
		descriptionCell.appendChild(descriptionInput);
		const priceInput = document.createElement('input');
		priceInput.type = 'number';
		priceInput.value = product.price;
		priceCell.textContent = '';
		priceCell.appendChild(priceInput);
		const quantityInput = document.createElement('input');
		quantityInput.type = 'number';
		quantityInput.value = product.quantity;
		quantityCell.textContent = '';
		quantityCell.appendChild(quantityInput);
		const saveButton = document.createElement('button');
		saveButton.textContent = 'Save';
		saveButton.className = 'btn btn-success btn-sm';
		saveButton.addEventListener('click', async () => {
			product.name = nameInput.value;
			product.description = descriptionInput.value;
			product.price = parseFloat(priceInput.value);
			product.quantity = parseInt(quantityInput.value);
			try {
				const response = await fetch(`/api/products/${product.id}`,
					{
						method: 'PUT', headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(product)
					});
				if (!response.ok)
					throw new Error('Network response was not ok');
				const data = await response.json();
				nameCell.textContent = data.name;
				descriptionCell.textContent = data.description;
				priceCell.textContent = data.price;
				quantityCell.textContent = data.quantity;
				actionsCell.removeChild(saveButton);
				showNotification('Product updated successfully'); // Show the notification 
			} catch (error) {
				console.error('Error updating product:', error);
			}
		});
		const actionsCell = row.cells[5];
		actionsCell.appendChild(saveButton);
	}

	async function deleteProduct(id, row) {
		try {
			const response = await fetch(`/api/products/${id}`,
				{ method: 'DELETE' });

			if (!response.ok)
				throw new Error('Network response was not ok');
			row.parentNode.removeChild(row);
			showNotification('Product deleted successfully'); // Show the notification 
		} catch (error) { console.error('Error deleting product:', error); }
	}
	fetchProducts(); // Initial fetch to populate the table
});

