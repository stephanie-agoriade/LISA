document.addEventListener('DOMContentLoaded', () => {
    // --- Éléments du DOM ---
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const microphoneBtn = document.getElementById('microphoneBtn');
    const attachFileBtn = document.getElementById('attachFileBtn');
    const fileInput = document.getElementById('fileInput');
    const starterQuestions = document.querySelectorAll('.starter-question');
    const transcriptionResultDiv = document.getElementById('transcriptionResult');
    const resultContentDiv = document.getElementById('resultContent');
    const messageBox = document.getElementById('messageBox');
    
    // --- Fonctions utilitaires ---

    /**
     * Affiche un message de notification temporaire.
     * @param {string} message - Le message à afficher.
     * @param {string} type - 'success', 'error', ou 'info' pour la couleur.
     */
    function showNotification(message, type = 'info') {
        const colorMap = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };
        messageBox.className = `message-box ${colorMap[type]} text-white font-medium px-6 py-3 rounded-lg shadow-xl`;
        messageBox.textContent = message;
        messageBox.classList.remove('hidden');

        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 3000);
    }

    /**
     * Ajoute un message au conteneur du chat.
     * @param {string} message - Le contenu du message.
     * @param {string} sender - 'user' ou 'lisa'.
     */
    function appendMessage(message, sender) {
        const messageContainer = document.createElement('div');
        const messageBubble = document.createElement('div');

        if (sender === 'user') {
            messageContainer.className = 'flex justify-end';
            messageBubble.className = 'bg-blue-600 text-white p-3 rounded-xl rounded-br-none max-w-xs';
        } else {
            messageContainer.className = 'flex justify-start';
            messageBubble.className = 'bg-gray-100 text-gray-800 p-3 rounded-xl rounded-bl-none max-w-xs';
        }

        messageBubble.innerHTML = `<p class="text-sm">${message}</p>`;
        messageContainer.appendChild(messageBubble);
        chatMessages.appendChild(messageContainer);

        // Scroll vers le bas pour voir le nouveau message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * Simule la réponse de l'IA (Lisa) après une courte pause.
     * @param {string} prompt - La question posée par l'utilisateur.
     */
    function simulateLisaResponse(prompt) {
        // Ajouter une animation de chargement/spinner
        const spinnerContainer = document.createElement('div');
        spinnerContainer.className = 'flex justify-start';
        spinnerContainer.innerHTML = '<div class="spinner my-3 ml-3"></div>';
        chatMessages.appendChild(spinnerContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            // Retirer le spinner
            spinnerContainer.remove();

            let responseText = "Merci pour votre demande. Je traite l'information...";

            if (prompt.includes("rédaction d'une procédure") || prompt.includes("micro") || prompt.includes("voice")) {
                responseText = "J'ai bien reçu la description. Je procède à l'analyse pour la rédaction et la création des tâches associées dans Baserow.";
                // Afficher le résultat de la transcription après la réponse de Lisa
                showTranscriptionResult(prompt);
            } else if (prompt.includes("créer, assigner, modifier une tâche")) {
                responseText = "Veuillez me fournir les détails : Nom de la tâche, responsable, et date limite. Je mettrai à jour le tableau de suivi.";
            } else if (prompt.includes("question sur une procédure")) {
                responseText = "Bien sûr. Quel est le nom de la procédure ou le sujet sur lequel vous souhaitez une information ?";
            } else {
                responseText = "Je n'ai pas compris votre demande. Pouvez-vous reformuler s'il vous plaît ?";
            }
            
            appendMessage(responseText, 'lisa');
            showNotification("Action transmise à n8n (simulée)", 'success');

        }, 1500); // Délai de 1.5 secondes pour simuler le traitement
    }

    /**
     * Affiche le panneau de résultat structuré de la procédure.
     * @param {string} rawInput - Le texte qui aurait été transcrit.
     */
    function showTranscriptionResult(rawInput) {
        transcriptionResultDiv.classList.remove('hidden');
        resultContentDiv.innerHTML = `
            <div class="p-4 border border-green-300 rounded-lg bg-green-100">
                <p class="font-semibold text-green-900 mb-2">Source (Voice-to-Text simulé) :</p>
                <p class="italic text-green-700">« ${rawInput.substring(0, 100)}... »</p>
            </div>
            <p class="mt-4">Lisa a structuré le contenu pour le document Word final et a identifié les tâches suivantes :</p>
            <ul class="list-disc list-inside ml-4 text-sm text-green-800">
                <li>Tâche 1 : Révision du contenu (Assigné à : Superviseur, Statut : Créée)</li>
                <li>Tâche 2 : Mise en forme Word (Assigné à : Assistant, Statut : Créée)</li>
                <li>Mise à jour du Tableau de suivi des tâches (sur Baserow) : OK</li>
            </ul>
        `;
    }

    // --- Gestionnaires d'événements ---

    /** Gestionnaire pour l'envoi de message (Clic ou Enter) */
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        appendMessage(message, 'user');
        simulateLisaResponse(message);
        chatInput.value = ''; // Vider le champ après envoi
    }

    // 1. Bouton "Envoyer"
    chatSendBtn.addEventListener('click', handleSendMessage);

    // 2. Touche "Enter" dans le champ de saisie
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // 3. Boutons de questions de démarrage
    starterQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            appendMessage(question, 'user');
            simulateLisaResponse(question);
        });
    });

    // 4. Bouton "Microphone" (Simule le Voice-to-Text)
    microphoneBtn.addEventListener('click', () => {
        const isRecording = microphoneBtn.classList.toggle('blink');
        const initialIconPath = 'M12 14c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4S8 1.79 8 4v6c0 2.21 1.79 4 4 4zM7 10v1c0 3.87 3.13 7 7 7s7-3.13 7-7v-1h-2v1c0 2.76-2.24 5-5 5s-5-2.24-5-5v-1H7zm5-12c1.1 0 2 0.9 2 2v6c0 1.1-.9 2-2 2s-2-.9-2-2V2c0-1.1.9-2 2-2z';
        const recordingIconPath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4h2v4h-2zm-1-6V7h2v4h-2z'; // Simuler une icône "parler" différente

        const svgIcon = microphoneBtn.querySelector('svg path');

        if (isRecording) {
            svgIcon.setAttribute('d', recordingIconPath);
            showNotification("Enregistrement audio en cours...", 'error');
        } else {
            svgIcon.setAttribute('d', initialIconPath);
            const transcriptionText = "Voici la nouvelle procédure à rédiger : l'accueil d'un nouveau collaborateur se fait en trois étapes : 1. Préparation du poste par l'IT. 2. Présentation à l'équipe par le manager. 3. Finalisation du dossier RH par les ressources humaines.";
            
            appendMessage('... (Transcription audio envoyée)', 'user');
            simulateLisaResponse(transcriptionText);
        }
    });

    // 5. Bouton "Pièce jointe" (Simule l'ajout d'un fichier)
    attachFileBtn.addEventListener('click', () => {
        fileInput.click(); // Ouvre la boîte de dialogue de sélection de fichier
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            appendMessage(`Fichier joint : ${fileName}`, 'user');
            simulateLisaResponse(`J'ai reçu le fichier joint : ${fileName}. Veuillez confirmer votre demande.`);
        }
    });
});