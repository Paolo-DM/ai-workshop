**Documento di Specifica – Esercizio di Formazione**

Costruzione Mini-CMS

**1\. Introduzione**

**1.1 Scopo del Documento:** Il presente documento definisce i requisiti funzionali e le specifiche tecniche per l'esercizio di formazione pratica volto a sperimentare l'integrazione efficace degli strumenti di Intelligenza Artificiale e di **vibe coding** all'interno del ciclo di vita completo dello sviluppo software (SDLC).

**1.2 Obiettivo dell'Esercizio:** L'obiettivo primario **non è solo usare strumenti AI per scrivere codice**, ma imparare a **integrare strategicamente l'AI nell'intero SDLC**. 

I partecipanti dovranno:

* Comprendere le differenze e le sinergie tra diverse categorie di strumenti AI (es. LLM Generativi come ChatGPT/Claude/Gemini vs. AI Assistive Tools IDE-based come Copilot/Windsurf/Cursor).  
  * Sperimentare l'applicazione di specifici strumenti AI nelle diverse fasi del SDLC: dalla progettazione e scrittura del codice, al debugging, testing, refactoring e potenziale documentazione.  
  * Praticare tecniche di Prompt Engineering efficaci per massimizzare l'utilità degli LLM.  
  * Riflettere su come l'AI modifica il workflow di sviluppo e il ruolo dello sviluppatore, promuovendo efficienza e qualità.  
  * Acquisire autonomia nell'uso strategico dell'AI per ridurre compiti ripetitivi.

**1.3 Durata Prevista:** L'esercizio è progettato per essere svolto in circa **3.5 ore**.

**1.4 Enfasi:** Il focus è sul **processo d'integrazione dell'AI nel workflow** e sull'apprendimento critico di *quando* e *come* usare i diversi strumenti disponibili. Il completamento del mini-CMS è funzionale a questo apprendimento, non il fine ultimo.

E’ fondamentale capire la differenza tra i modelli LLM disponibili e saperli scegliere in base al costo e al fine.

**2\. Panoramica del Sistema: Mini-CMS "User Hub"**

L'applicazione da realizzare è un prototipo di Content Management System (CMS) minimale, focalizzato sulla gestione di utenti e relativi permessi, denominato "User Hub". 

**3\. Requisiti Funzionali**

* **3.1 Gestione Utenti**  
  * **RF 3.1.1 List Users (Obbligatorio):** Il sistema deve permettere di visualizzare un elenco di tutti gli utenti registrati, mostrando almeno ID, Nome e Email.  
  * **RF 3.1.2 Create User (Obbligatorio):** Il sistema deve fornire un'interfaccia (es. form) per inserire un nuovo utente (input: Nome, Email). Alla creazione, il sistema deve assegnare un ID univoco.  
  * **RF 3.1.3 Update User (Opzionale):** Se il tempo lo permette, implementare la modifica dei dati di un utente esistente.  
  * **RF 3.1.4 Delete User (Opzionale):** Se il tempo lo permette, implementare la rimozione di un utente dal sistema. (Fare attenzione alla UX)  
* **3.2 Gestione Permessi**  
  * **RF 3.2.1 List Permissions (Obbligatorio):** Il sistema deve visualizzare un elenco dei permessi definiti (es. ID, Nome del permesso come CAN\_VIEW\_REPORTS).  
  * **RF 3.2.2 Create Permission (Obbligatorio):** Il sistema deve permettere di creare un nuovo tipo di permesso (input: Nome/ID del permesso).  
  * **RF 3.2.3 Update Permission (Opzionale):** Se il tempo lo permette, implementare la modifica dei dati di un permesso esistente (es. rinominarlo).  
  * **RF 3.2.4 Delete Permission (Opzionale):** Se il tempo lo permette, implementare la rimozione di un permesso dal sistema (considerare la gestione delle associazioni esistenti con gli utenti).  
* **3.3 Associazione Utenti-Permessi**  
  * **RF 3.3.1 Assign/Unassign Permission (Obbligatorio):** Il sistema deve permettere di associare uno o più permessi esistenti a un utente specifico e di rimuovere tali associazioni (relazione Many-to-Many). L'interfaccia utente per questa operazione può essere semplificata (es. selezione da dropdown/checkbox in una vista dettaglio utente o tramite API dedicata).  
  * **RF 3.3.2 View User Permissions (Obbligatorio):** L'elenco utenti (RF 3.1.1) o una vista dettaglio utente deve mostrare i permessi attualmente associati a ciascun utente.  
  * Dashboard per segnalare utenti senza permessi  
* **3.4 Visibilità UI Basata sui Permessi**  
  * **RF 3.4.1 Conditional UI Element (Obbligatorio):** Definire un elemento specifico nell'interfaccia utente frontend (es. un pulsante "Admin Actions", una voce di menu, una card informativa). Questo elemento deve essere visibile *solo se* l'utente attualmente "attivo" (la gestione del login non è richiesta, si può simulare selezionando un utente o avendo un utente hardcodato nel frontend) possiede un determinato permesso (es. CAN\_ACCESS\_ADMIN\_TOOLS).  
* **3.5 Aggiornamenti Real-time**  
  * **RF 3.5.1 Live User List Update (Obbligatorio):** Quando un utente viene creato (o modificato/eliminato, se implementato) attraverso l'interfaccia di un client, tutti gli altri client connessi al sistema devono vedere la loro lista utenti (RF 3.1.1) aggiornarsi automaticamente in tempo reale, senza necessità di refresh manuale della pagina. Questo deve essere implementato tramite WebSockets. 

**4\. Specifiche Tecniche e Vincoli**

* **4.1 Architettura:** Applicazione Web Client-Server.  
* **4.2 Tecnologia Frontend (Opzionale \- Scegliere UNA):** Angular | React.  
* **4.3 Tecnologia Backend (Opzionale \- Scegliere UNA):** Node.js (Express) | Python (Flask/FastAPI).  
* **4.4 Persistenza Dati (Opzionale \- Scegliere UNA):** Mock Data (JSON/In-memory) | Database Reale (PostgreSQL/MongoDB/SQLite).  
* **4.5 Implementazione WebSocket (Obbligatorio):** Utilizzo librerie standard   
* **4.6 Libreria UI Component (Raccomandato):** Angular Material, Ant Design (React/Angular), MUI, etc.  
* **4.7 Metodologia di Sviluppo: AI-Assisted SDLC (Obbligatorio):** L'uso integrato e strategico di strumenti AI è richiesto in tutte le fasi pertinenti del ciclo di vita dello sviluppo, dalla progettazione al testing.

**5\. Linee Guida Utilizzo AI** 

* **5.1 Approccio Strategico:** Non usare un solo strumento per tutto. Combinare LLM (Gemini) per brainstorming, spiegazioni e AI Assistive Tools IDE-based (Windsurf) per la scrittura di codice contestuale, completamento, refactoring in-place, generazione test, commenti e Readme.  
* **5.2 Prompt Engineering (per LLM):** È un'abilità chiave. Costruire prompt efficaci:  
  * **Essere Specifici:** Includere contesto (linguaggio, framework), obiettivo chiaro, vincoli.  
  * **Definire Output:** Chiedere codice, spiegazioni, diagrammi, JSON, etc..  
  * **Dare Istruzioni Chiare:** Specificare best practice (es. SOLID, DRY), stile, formato.  
  * **Impostare un Ruolo:** "Agisci come un senior developer esperto in...".  
  * **Iterare:** Riformulare se l'output non è utile, aggiungendo dettagli. Evitare prompt generici.  
* **5.3 AI Assistive Tools (IDE-Based):**  
  * Sfruttare il **contesto del progetto** per suggerimenti inline, refactoring su più file, generazione test contestuali.  
  * Usare le funzionalità specifiche.  
  * Configurare istruzioni personalizzate se lo strumento lo permette per dare delle regole al progetto  
* **5.4 Validazione Critica:** **Sempre validare il codice generato dall'AI**. L'AI è un assistente, la responsabilità finale è dello sviluppatore. Sviluppare pensiero critico.

**6\. Fasi di Implementazione Suggerite (Guida Flessibile per Applicare AI nel SDLC)**

Questa è una traccia logica; l'ordine esatto può variare in base alle scelte e al flusso di lavoro personale.

1. **Fase 1: Progettazione & Setup (AI per Brainstorming/Boilerplate):**  
   * Usare LLM per discutere alternative architetturali (sebbene semplice), scegliere librerie, definire strutture dati iniziali (JSON o modelli DB).  
   * Usare AI Assistive Tool per inizializzare progetti FE/BE, installare dipendenze, creare struttura cartelle base.  
2. **Fase 2: Sviluppo Backend (AI per Codifica/Logica):**  
   * Usare AI Assistive Tool per generare codice API (controllers/routes, funzioni handler), implementare logica CRUD base.  
   * Usare LLM per chiedere implementazioni di pattern specifici o risolvere dubbi logici.  
3. **Fase 3: Persistenza (AI per Query/Setup):**  
   * Usare AI Assistive Tool per generare codice di connessione DB, script DDL (se DB), query SQL/ORM, o funzioni per I/O su JSON.  
4. **Fase 4: Sviluppo Frontend (AI per Componenti/UI):**  
   * Usare AI Assistive Tool per generare componenti UI (struttura, stile base con libreria scelta), implementare chiamate API.  
   * Usare LLM per chiedere come implementare feature UI specifiche o best practice del framework scelto.  
5. **Fase 5: Funzionalità Avanzate (AI per Logica Complessa/Integrazione):**  
   * Usare AI (entrambi i tipi) per implementare la logica M-N, l'integrazione WebSocket (server & client), la logica di UI condizionale.  
6. **Fase 6: Testing (AI per Generazione Test):**  
   * Usare AI Assistive Tool per **generare unit test** base per le funzioni critiche implementate.  
7. **Fase 7: Refactoring & Revisione (AI per Qualità/Best Practice):**  
   * Usare AI Assistive Tool per analizzare porzioni di codice e suggerire refactoring secondo principi SOLID, DRY, KISS. Chiedere all'AI di "fare una code review" di una funzione specifica.  
8. **Fase 8: Integrazione & Debugging (AI per Risoluzione Problemi):**  
   * Usare AI per diagnosticare errori (incollare stack trace/messaggi), suggerire fix, risolvere problemi di integrazione FE/BE.

**7\. Conclusione Formazione**

* Focus e analisi dei processi svolti, breve tavola rotonda per analizzare e discutere del risultato.