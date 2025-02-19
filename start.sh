#!/bin/bash

# Installa le dipendenze
npm install

# Avvia il server Laravel
php artisan serve --host=0.0.0.0 --port=3000 &

# Costruisce il frontend (React) per la produzione
npm run build

# Servi i file statici prodotti dal frontend React (se usi Laravel per servire il frontend)
php -S 0.0.0.0:3001 -t public
