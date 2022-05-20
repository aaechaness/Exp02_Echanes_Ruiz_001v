<?php
// Comprobar campos vacíos
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "¡No se proporcionan argumentos!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// Crear el correo electrónico y enviar el mensaje
$to = 'aechanes@gmail.com'; // Agrega tu dirección de correo electrónico entre '' reemplazando tunombre@tudominio.com - Aquí es donde el formulario enviará un mensaje.
$email_subject = "Formulario de contacto del sitio web:  $name";
$email_body = "Ha recibido un nuevo mensaje del formulario de contacto de su sitio web.\n\n"."Aquí están los detalles:\n\nNombre: $name\n\nEmail: $email_address\n\nMensaje:\n$message";
$headers = "Desde: noreply@jordinbotanico.cl\n"; // Esta es la dirección de correo electrónico de donde provendrá el mensaje generado. Recomendamos usar algo como noreply@yourdomain.com.
$headers .= "Responder a: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>