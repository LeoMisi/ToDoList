import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Para lidar com __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo do banco de dados
const dbFolderPath = path.resolve(__dirname, "../../database");
const dbPath = path.join(dbFolderPath, "todolist.db");

// Verifica se o diretório 'database' existe; cria se não existir
if (!fs.existsSync(dbFolderPath)) {
	fs.mkdirSync(dbFolderPath);
	console.log('Diretório "database" criado.');
}

// Inicializa e exporta a conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Erro ao conectar ao banco de dados:", err.message);
	} else {
		console.log("Conectado ao banco de dados SQLite.");
	}
});

export default db;
