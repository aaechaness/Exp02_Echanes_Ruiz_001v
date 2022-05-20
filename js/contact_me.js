$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // Para mensaje de éxito/fracaso
            // Compruebe si hay espacios en blanco en el nombre para el mensaje de éxito/fallo
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // mensaje de exito
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Tu mensaje ha sido enviado. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //borrar todos los campos
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // mensaje de error
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Lo Siento " + firstName + ", parece que nuestro servidor de correo no responde. ¡Por favor, inténtelo de nuevo más tarde!");
                    $('#success > .alert-danger').append('</div>');
                    //borrar todos los campos
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*Al hacer clic en Ocultar por completo las casillas de error/éxito */
$('#name').focus(function() {
    $('#success').html('');
});
