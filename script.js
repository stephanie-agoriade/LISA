 document.addEventListener('DOMContentLoaded', () => {
            const organization = {
                director: 'Bérangère BRUNEVAL',
                assistant: 'Aurore LEBEAU',
                pole: 'Ressources et moyens',
                services: [
                    {
                        name: 'Finance-Social',
                        manager: 'Christelle FERRE',
                        subServices: [
                            { name: 'Service comptabilité', employees: ['Valérie BERLAND', 'Karine BRUNELEAU', 'Estelle DELOISON', 'Murielle SCHALLER', 'Alexandra TODESCHINI'] },
                            { name: 'Service social paie', employees: ['Delphine GUERRY', 'Ornella BAUD'] }
                        ]
                    },
                    {
                        name: 'Ressources humaines',
                        manager: 'Sabrina PELLETIER-GERAUD',
                        subServices: [
                            { name: 'Service RH', employees: ['Aurélie LOIGEROT'] }
                        ]
                    },
                    {
                        name: 'Contrôle de gestion',
                        manager: 'Sandrine CRELOT',
                        employees: [],
                        subServices: []
                    },
                    {
                        name: 'Patrimoine et gestion locative',
                        manager: 'Elodie GUILLET',
                        subServices: [
                            {
                                name: 'Entretien et sécurité des bâtiments',
                                manager: 'Christophe MADEIRA',
                                secretaries: ['Fanélie AUDURIER', 'Eliane GOHON'],
                                employees: ['Fanélie AUDURIER', 'Eliane GOHON', 'Sébastien BOULLAY', 'Benoit LEMARECHAL', 'Jean Yves LOGEAIS', 'Henri MARTIN']
                            },
                            {
                                name: 'Service entrées et sorties',
                                employees: ['Floriane TESSIER', 'Aicha BORDAGE', 'Nathalie CHAUVEAU', 'Cindy DUANT', 'Nancy PAREJA', 'Christophe MADEIRA']
                            }
                        ]
                    }
                ]
            };
            
            // NOTE: This knowledge base is based on the provided documents.
            const knowledgeBase = {
                'procedures': {
                    'recrutement': {
                        'titre': 'Procédure de recrutement',
                        'objet': 'Harmoniser les méthodes de recrutement au sein de VISTA.',
                        'contrats': ['CDI', 'CDD', 'Intérim'],
                        'diffusion': ['Interne (site, réseaux sociaux, mail)', 'Externe (Jobboards, cabinets de recrutement)'],
                        'etapes': [
                            'Définition du besoin par le chef de service/directeur de pôle.',
                            'Préparation et diffusion de l\'annonce par le service RH.',
                            'Gestion des candidatures et sélection pour les entretiens.',
                            'Entretiens menés par le chef de service et le directeur de pôle.',
                            'Information des candidats (retenus et non retenus).',
                            'Clôture de l\'annonce sur les sites de diffusion.',
                        ]
                    },
                    'logement': {
                        'titre': 'Le logement',
                        'qui_fait_quoi': {
                            'Créer un nouveau logement': 'service Patrimoine et Gestion Logistique',
                            'Sortir un logement pour restitution au propriétaire': 'service Patrimoine et Gestion Logistique',
                            'Faire des demandes d’intervention': 'travailleurs sociaux pour les logements, chefs de service (pour les bâtiments, bureaux)',
                            'Planifier et suivre les travaux': 'service Patrimoine et Gestion Logistique',
                            'Valider les demandes de travaux': 'chefs de service, directeurs',
                            'EDL S/E': 'service Patrimoine et Gestion Logistique',
                            'Rendre indisponible un logement pour grands travaux': 'service Patrimoine et Gestion Logistique'
                        }
                    },
                    'occupants': {
                        'titre': 'Les occupants',
                        'qui_fait_quoi': {
                            'Créer les occupants et attribuer les accompagnements': 'secrétaires/assistantes',
                            'Modifier les fiches occupants': 'secrétaires/assistantes',
                            'Attribuer un logement à un ou plusieurs occupants': 'secrétaires/assistantes',
                            'Sortir les occupants d’un logement': 'secrétaires/assistantes',
                            'Transférer les occupants d’un logement à un autre': 'secrétaires/assistantes',
                            'Editer les attestations d’hébergement': 'travailleurs sociaux',
                            'Suivi de la situation financière des occupants': 'travailleurs sociaux + secrétaires/assistantes'
                        }
                    },
                    'participations': {
                        'titre': 'Les participations financières',
                        'qui_fait_quoi': {
                            'Renseigner les ressources mensuelles': 'travailleurs sociaux référents',
                            'Générer les appels à paiements': 'secrétaires/assistantes',
                            'Enregistrer les mouvements': 'secrétaires/assistantes',
                            'Editer les quittances': 'secrétaires/assistantes',
                            'Mettre en place les plans d’apurement': 'chefs de service'
                        }
                    },
                    'collaborateurs': {
                        'titre': 'Les collaborateurs',
                        'qui_fait_quoi': {
                            'Créer les comptes utilisateurs et attribuer les logements': 'secrétaires/assistantes',
                            'Supprimer les comptes utilisateurs': 'secrétaires/assistantes via support LARESTIA',
                            'Former les nouveaux collaborateurs à l’utilisation de LARESTIA': 'secrétaires/assistantes'
                        }
                    }
                }
            };


            function getAllCollaborators(org) {
                const employees = new Set();
                employees.add(org.assistant);
                org.services.forEach(service => {
                    if (service.employees) service.employees.forEach(e => employees.add(e));
                    service.subServices.forEach(sub => {
                        if (sub.employees) sub.employees.forEach(e => employees.add(e));
                        if (sub.secretaries) sub.secretaries.forEach(e => employees.add(e));
                    });
                });
                return Array.from(employees).sort();
            }

            const collaborators = getAllCollaborators(organization);

            const taskData = [
                {
                    task: 'Régularisation des factures fournisseurs', validation: 'Nouveau', collaborator: 'Valérie BERLAND', status: 'Non démarré', service: 'Finance-Social', serviceManager: 'Christelle FERRE', pole: 'Ressources et moyens', director: 'Bérangère BRUNEVAL', creationDate: '2025-09-11', dueDate: '2025-10-30', lastModified: 'Initialisation'
                },
                {
                    task: 'Mise à jour des procédures RH', validation: 'En attente', collaborator: 'Aurélie LOIGEROT', status: 'En cours', service: 'Ressources humaines', serviceManager: 'Sabrina PELLETIER-GERAUD', pole: 'Ressources et moyens', director: 'Bérangère BRUNEVAL', creationDate: '2024-11-20', dueDate: '2024-12-15', lastModified: 'Initialisation'
                },
                {
                    task: 'Contrôle des entrées/sorties locataires', validation: 'Validé', collaborator: 'Floriane TESSIER', status: 'Terminée', service: 'Patrimoine et gestion locative', serviceManager: 'Elodie GUILLET', pole: 'Ressources et moyens', director: 'Bérangère BRUNEVAL', creationDate: '2024-12-10', dueDate: '2025-01-01', lastModified: 'Initialisation'
                }
            ];
            
            const absenceNotifications = [
                { dateStart: '2025-09-08', dateEnd: '2025-09-15', collaborator: 'Karine BRUNELEAU', reason: 'Maladie' },
                { dateStart: '2025-09-09', dateEnd: '2025-09-09', collaborator: 'Ornella BAUD', reason: 'Congé familial' },
                { dateStart: '2025-09-10', dateEnd: '2025-09-10', collaborator: 'Nathalie CHAUVEAU', reason: 'Rendez-vous médical' },
            ];

            const messageBox = document.getElementById('messageBox');
            const absenceSelect = document.getElementById('absenceSelect');
            const recommendationBtn = document.getElementById('recommendationBtn');
            const recommendationResult = document.getElementById('recommendationResult');
            const chatMessages = document.getElementById('chatMessages');
            const chatInput = document.getElementById('chatInput');
            const chatSendBtn = document.getElementById('chatSendBtn');
            const microphoneBtn = document.getElementById('microphoneBtn');
            const attachFileBtn = document.getElementById('attachFileBtn');
            const fileInput = document.getElementById('fileInput');
            const transcriptionResult = document.getElementById('transcriptionResult');
            const resultContent = document.getElementById('resultContent');
            const proceduresTableBody = document.getElementById('proceduresTableBody');
            const absenceNotificationsContainer = document.getElementById('absenceNotifications');
            const starterQuestions = document.querySelectorAll('.starter-question');
          
            // Initial render of the table with mock data
            function renderTable() {
                proceduresTableBody.innerHTML = ''; // Clear the table
                taskData.forEach((task, index) => {
                    proceduresTableBody.appendChild(createStaticRow(task, index));
                });
            }

            // Function to create a static (non-editable) table row
            function createStaticRow(task, index) {
                const row = document.createElement('tr');
                row.className = "bg-white hover:bg-gray-50 transition-colors duration-200";
                row.dataset.index = index;
                const statusColor = getStatusColor(task.status);
                const validationColor = getValidationColor(task.validation);
                row.innerHTML = `
                    <td class="py-2 px-4 text-sm text-gray-800">${task.task}</td>
                    <td class="py-2 px-4 text-sm">
                        <span class="px-2 py-1 ${validationColor} rounded-full text-xs font-medium">${task.validation}</span>
                    </td>
                    <td class="py-2 px-4 text-sm text-gray-800">${task.collaborator}</td>
                    <td class="py-2 px-4 text-sm">
                        <span class="px-2 py-1 ${statusColor} rounded-full text-xs font-medium">${task.status}</span>
                    </td>
                    <td class="py-2 px-4 text-sm text-gray-800">${task.service}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">${task.serviceManager}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">${task.pole}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">${task.director}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">${formatDate(task.creationDate)}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">${formatDate(task.dueDate)}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">${task.lastModified}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">
                        <button class="edit-btn bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs hover:bg-gray-300" data-index="${index}">Modifier</button>
                    </td>
                `;
                return row;
            }

            // Function to get color for task status
            function getStatusColor(status) {
                switch (status) {
                    case 'En cours': return 'bg-yellow-100 text-yellow-800';
                    case 'Terminée': return 'bg-green-100 text-green-800';
                    case 'Non démarré': return 'bg-gray-100 text-gray-800';
                    default: return 'bg-blue-100 text-blue-800';
                }
            }

            // Function to get color for task validation
            function getValidationColor(validation) {
                switch (validation) {
                    case 'Nouveau': return 'bg-red-100 text-red-800';
                    case 'En attente': return 'bg-orange-100 text-orange-800';
                    case 'Validé': return 'bg-green-100 text-green-800';
                    default: return 'bg-gray-100 text-gray-800';
                }
            }

            // Handle decision support
            recommendationBtn.addEventListener('click', () => {
                const absentCollabName = absenceSelect.options[absenceSelect.selectedIndex].textContent;
                if (!absentCollabName || absentCollabName === 'Sélectionner un collaborateur absent') {
                    showNotification('Veuillez sélectionner un collaborateur absent.', 'bg-yellow-500');
                    return;
                }

                const availableCollaborators = collaborators.filter(c => c !== absentCollabName);
                if (availableCollaborators.length > 0) {
                    const recommendation = availableCollaborators[Math.floor(Math.random() * availableCollaborators.length)];
                    recommendationResult.innerHTML = `
                        <p class="font-semibold text-gray-800">Recommandation :</p>
                        <p>En l'absence de ${absentCollabName}, l'agent Lisa recommande de réassigner la tâche à <span class="text-blue-600 font-semibold">${recommendation}</span>, en raison de sa disponibilité et de son expertise.</p>
                    `;
                    recommendationResult.classList.remove('hidden');
                } else {
                    recommendationResult.innerHTML = `<p class="text-red-600">Aucun collaborateur disponible pour la réaffectation.</p>`;
                    recommendationResult.classList.remove('hidden');
                }
            });

            // Handle chat and speech interaction
            function handleRequest(message) {
                if (message.trim() === '') return;

                const userMessageHtml = `
                    <div class="flex justify-end">
                        <div class="bg-blue-600 text-white p-3 rounded-xl rounded-br-none max-w-xs">
                            <p class="text-sm">${message}</p>
                        </div>
                    </div>
                `;
                chatMessages.insertAdjacentHTML('beforeend', userMessageHtml);
                
                const lowerText = message.toLowerCase();
                let lisaResponseText = '';
                let isTaskCreation = false;
                let taskInfo = '';

                // GESTION DES STARTERS
                if (lowerText.includes('je veux initier la rédaction d\'une procédure')) {
                    lisaResponseText = `Je vous écoute. Vous pouvez utiliser le micro pour dicter vos explications ou les taper directement ici. Je les analyserai et vous proposerai une procédure structurée, en m'inspirant du format de la procédure de recrutement existante.`;
                } else if (lowerText.includes('créer, assigner, modifier une tâche')) {
                    lisaResponseText = `Bien sûr. Veuillez me donner les informations nécessaires : le titre de la tâche, le salarié concerné, le statut d'avancement, et les dates de début et de fin. Par exemple : "Créer une tâche pour Valérie BERLAND : Régularisation des factures."`;
                } else if (lowerText.includes('poser une question sur une procédure')) {
                    lisaResponseText = `De quelle procédure souhaitez-vous parler ? Une fois que vous me l'aurez indiqué, veuillez formuler votre question. Par exemple : "Qui est responsable de la création des fiches occupants dans la procédure 'Les occupants' ?"`;
                } 
                // GESTION DES CONNAISSANCES
                else if (lowerText.includes('avancement de la tâche')) {
                    const taskName = lowerText.match(/la tâche (.+?)(?:\.|\?| et| de)/);
                    if (taskName && taskName[1]) {
                        const taskMatch = taskData.find(t => t.task.toLowerCase().includes(taskName[1].trim()));
                        if (taskMatch) {
                            lisaResponseText = `L'avancement de la tâche "${taskMatch.task}" est : ${taskMatch.status}.`;
                        }
                    }
                } else if (lowerText.includes('dernière modification de la tâche')) {
                    const collaboratorName = lowerText.match(/de la tâche de (.+?)(?:\.|\?)/);
                    if (collaboratorName && collaboratorName[1]) {
                         const taskMatch = taskData.find(t => t.collaborator.toLowerCase().includes(collaboratorName[1].trim()));
                        if (taskMatch) {
                            lisaResponseText = `La dernière modification de la tâche de ${taskMatch.collaborator} est : ${taskMatch.lastModified}.`;
                        } else {
                            lisaResponseText = `Je n'ai pas trouvé de tâche pour ${collaboratorName[1].trim()}.`;
                        }
                    } else {
                        lisaResponseText = `Pour quelle tâche souhaitez-vous connaître la dernière modification ?`;
                    }
                } else if (lowerText.includes('salariés du service')) {
                    const serviceName = lowerText.match(/service (.+?)(?:\.|\?)/);
                    if (serviceName && serviceName[1]) {
                        const serviceMatch = organization.services.find(s => s.name.toLowerCase().includes(serviceName[1].trim()));
                        if (serviceMatch) {
                            const employees = [];
                            if (serviceMatch.employees) employees.push(...serviceMatch.employees);
                            serviceMatch.subServices.forEach(sub => {
                                if (sub.employees) employees.push(...sub.employees);
                                if (sub.secretaries) employees.push(...sub.secretaries);
                            });
                            if (employees.length > 0) {
                                lisaResponseText = `Voici les salariés du service ${serviceMatch.name} : ${employees.join(', ')}.`;
                            } else {
                                lisaResponseText = `Le service ${serviceMatch.name} ne contient pas de salariés dans l'organigramme.`;
                            }
                        }
                    }
                } else if (lowerText.includes('qui fait quoi') || lowerText.includes('qui s\'occupe de')) {
                    let found = false;
                    for (const procKey in knowledgeBase.procedures) {
                        const proc = knowledgeBase.procedures[procKey];
                        if (proc.qui_fait_quoi) {
                            for (const tache in proc.qui_fait_quoi) {
                                if (lowerText.includes(tache.toLowerCase())) {
                                    lisaResponseText = `${tache} : ${proc.qui_fait_quoi[tache]}.`;
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if (found) break;
                    }
                     if (!found) {
                        lisaResponseText = "Je ne trouve pas de réponse à cette question dans la base de connaissances. Veuillez vous adresser au chef de service concerné.";
                    }
                } else if (lowerText.includes('donne-moi la procédure de') || lowerText.includes('quelle est la procédure de')) {
                    const procName = lowerText.match(/procédure de (.+?)(?:\.|\?)/);
                    if (procName && procName[1]) {
                        const proc = knowledgeBase.procedures[procName[1].trim()];
                        if (proc) {
                            lisaResponseText = `Voici un résumé de la **${proc.titre}** :
                                **Objet** : ${proc.objet}
                                **Type de contrats** : ${proc.contrats.join(', ')}.
                                **Diffusion des offres** : ${proc.diffusion.join(', ')}.
                                **Étapes** :
                                ${proc.etapes.map(step => `- ${step}`).join('\n')}`;
                        }
                    }
                } else if (lowerText.includes('crée une tâche pour')) {
                    const taskMatch = lowerText.match(/(?:tâche pour|tâche pour|tâche :)\s(.+?):(.+)/);
                    if (taskMatch) {
                        const collaboratorName = taskMatch[1].trim();
                        const taskTitle = taskMatch[2].trim();
                        
                        const foundCollaborator = collaborators.find(c => collaboratorName.includes(c.toLowerCase()));
                        if (foundCollaborator) {
                            const newDate = new Date().toISOString().slice(0, 10);
                            const newTask = {
                                task: taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1),
                                validation: 'Nouveau',
                                collaborator: foundCollaborator,
                                status: 'Non démarré',
                                service: 'Non spécifié',
                                serviceManager: 'Non spécifié',
                                pole: organization.pole,
                                director: organization.director,
                                creationDate: newDate,
                                dueDate: newDate,
                                lastModified: `Création via agent - ${new Date().toLocaleString('fr-FR')}`
                            };

                            const service = organization.services.find(s => s.subServices.some(sub => sub.employees && sub.employees.includes(foundCollaborator)));
                            if (service) {
                                newTask.service = service.name;
                                newTask.serviceManager = service.manager;
                            }
                            taskData.unshift(newTask);
                            isTaskCreation = true;
                            lisaResponseText = `J'ai créé et assigné la tâche "${newTask.task}" à ${newTask.collaborator}. J'ai mis à jour le tableau des procédures.`;
                            taskInfo = `
                                <p class="font-semibold text-gray-800">Tâche créée :</p>
                                <p>${newTask.task}</p>
                                <p class="font-semibold text-gray-800 mt-4">Salarié assigné :</p>
                                <p>${newTask.collaborator}</p>
                                <p class="font-semibold text-gray-800 mt-4">Service :</p>
                                <p>${newTask.service}</p>
                            `;
                        } else {
                            lisaResponseText = `Je n'ai pas trouvé le collaborateur "${collaboratorName}" dans l'organigramme. Veuillez vérifier l'orthographe.`;
                        }
                    } else {
                        lisaResponseText = "Je n'ai pas compris votre demande. Pour créer une tâche, utilisez le format : 'Crée une tâche pour [nom du salarié] : [nom de la tâche]'";
                    }
                } else {
                    lisaResponseText = "Je ne comprends pas. Pour commencer, vous pouvez choisir une des questions ci-dessus ou reformuler votre demande.";
                }

                // If no specific response was generated, use a fallback
                if (!lisaResponseText) {
                    lisaResponseText = "Je ne trouve pas la réponse dans ma base de connaissances. Veuillez vous adresser au chef de service concerné.";
                }

                const lisaMessageHtml = `
                    <div class="flex justify-start">
                        <div class="bg-blue-100 text-blue-800 p-3 rounded-xl rounded-bl-none max-w-xs">
                            <p class="text-sm">${lisaResponseText}</p>
                        </div>
                    </div>
                `;
                
                setTimeout(() => {
                    chatMessages.insertAdjacentHTML('beforeend', lisaMessageHtml);
                    if (isTaskCreation) {
                        transcriptionResult.classList.remove('hidden');
                        resultContent.innerHTML = taskInfo;
                        renderTable();
                    }
                    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
                }, 1000);
            }
            
            chatSendBtn.addEventListener('click', () => {
                handleRequest(chatInput.value);
                chatInput.value = '';
            });

            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleRequest(chatInput.value);
                    chatInput.value = '';
                }
            });

            // Handle starter questions click
            starterQuestions.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    handleRequest(e.target.dataset.question);
                    chatInput.value = '';
                });
            });

            // File upload logic
            attachFileBtn.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const userMessageHtml = `
                        <div class="flex justify-end">
                            <div class="bg-blue-600 text-white p-3 rounded-xl rounded-br-none max-w-xs">
                                <p class="text-sm">Pièce jointe : ${file.name}</p>
                            </div>
                        </div>
                    `;
                    chatMessages.insertAdjacentHTML('beforeend', userMessageHtml);
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const fileContent = e.target.result;
                        const simulatedResponse = `Analyse du compte rendu de réunion. J'ai identifié la procédure "Gestion des stocks" et les tâches suivantes : "Vérification des inventaires" et "Mise à jour des fiches produits". J'ai assigné la tâche de vérification à Sébastien BOULLAY et la mise à jour à Delphine GUERRY.`;
                        handleRequest(simulatedResponse);
                    };
                    reader.readAsText(file);
                }
            });


            let isRecording = false;
            let recognition = null;
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.lang = 'fr-FR';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;
                
                recognition.onstart = () => {
                    isRecording = true;
                    microphoneBtn.classList.add('blink');
                    showNotification('Écoute en cours...', 'bg-red-500');
                };
                recognition.onend = () => {
                    isRecording = false;
                    microphoneBtn.classList.remove('blink');
                };
                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    const lastMessageHtml = `
                        <div class="flex justify-end">
                            <div class="bg-blue-600 text-white p-3 rounded-xl rounded-br-none max-w-xs">
                                <p class="text-sm">${transcript}</p>
                            </div>
                        </div>
                    `;
                    chatMessages.insertAdjacentHTML('beforeend', lastMessageHtml);
                    handleRequest(transcript);
                };
                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    showNotification('Erreur de reconnaissance vocale. Veuillez réessayer.', 'bg-red-500');
                    isRecording = false;
                    microphoneBtn.classList.remove('blink');
                };
                microphoneBtn.addEventListener('click', () => {
                    if (isRecording) {
                        recognition.stop();
                    } else {
                        recognition.start();
                    }
                });
            } else {
                microphoneBtn.style.display = 'none';
                console.warn('Web Speech API n\'est pas supportée par ce navigateur.');
            }

            function renderAbsenceNotifications() {
                absenceNotificationsContainer.innerHTML = '';
                absenceNotifications.forEach(notif => {
                    const p = document.createElement('p');
                    p.innerHTML = `<span class="font-semibold text-gray-800">${formatDate(notif.dateStart)} :</span> ${notif.collaborator} est absent. Raison : ${notif.reason}. Retour prévu le ${formatDate(notif.dateEnd)}`;
                    absenceNotificationsContainer.appendChild(p);
                });
            }

            function formatDate(dateString) {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }

            function showNotification(message, bgColor = 'bg-green-500') {
                messageBox.textContent = message;
                messageBox.className = `message-box ${bgColor} text-white font-medium px-6 py-3 rounded-lg shadow-xl`;
                messageBox.classList.remove('hidden');
                setTimeout(() => {
                    messageBox.classList.add('hidden');
                }, 4000);
            }

            // Initial rendering of the table and notifications
            renderTable();
            renderAbsenceNotifications();
        });