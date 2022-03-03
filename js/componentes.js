let cartaoAlimentacao = (desc, id, imagemURL, name, price) => {
    return `<section class="page-section">
	          <div class="container">
			    <div class="product-item">
				  <div class="product-item-title d-flex">
				     <div class="bg-faded p-5 d-flex ms-auto rounded">
					    <h2 class="section-heading mb-0">
						   <span class="section-heading-upper">${name}</span>
						   <span class="section-heading-lower>R$${price}</span>
						</h2>
					 </div>
				  </div>
				  <img class="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0"
				       src="${imagemURL}" alt="..." />
				  <div class="product-item-description d-flex me-auto">
				     <div class="bg-faded p-5 rounded">
					    <p class="mb-0">${desc}.</p>
					 </div>
					 <br />
					 <button type="button" class="btn btn-primary" onclick="enviarPedido(
						 ${JSON.stringify({ desc, id, imagemURL, name, price })}, this')>Pedido</button>
				  </div>
				</div>
			  </div>
	       </section>`
}