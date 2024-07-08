<?php
include 'config.php';

if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])) {
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    if (!empty($username) && !empty($email) && !empty($password)) {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        if ($stmt->execute()) {
            echo "Inscription réussie ! Vous pouvez maintenant vous <a href='index.html'>connecter</a>.";
        } else {
            echo "Erreur lors de l'inscription.";
        }
    } else {
        echo "Veuillez remplir tous les champs.";
    }
} else {
    echo "Formulaire non soumis.";
}
?>
