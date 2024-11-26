document.addEventListener("DOMContentLoaded", () => {
    // Define el total de la compra
    const total = 65.00;

    // Renderiza el botón de PayPal
    paypal.Buttons({
        // Crea el pedido
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2) // Total en formato de número
                    }
                }]
            });
        },
        // Maneja la aprobación del pago
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("¡Gracias, " + details.payer.name.given_name + "! Tu pago fue exitoso.");
            });
        },
        // Maneja errores
        onError: function (err) {
            console.error("Error al procesar el pago:", err);
            alert("Hubo un problema con tu pago. Por favor, intenta nuevamente.");
        }
    }).render("#paypal-button-container"); // Renderiza el botón en este contenedor
});
