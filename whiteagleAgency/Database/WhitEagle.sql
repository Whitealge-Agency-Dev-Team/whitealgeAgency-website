CREATE TABLE Company (
    companyId TINYINT IDENTITY(1,1) NOT NULL,
    companyName VARCHAR(40) NOT NULL,
    companyType varchar(50) NOT NULL,
    PRIMARY KEY (companyId),
);

CREATE TABLE Professional (
    professionalId TINYINT IDENTITY(1,1) NOT NULL,
    companyId TINYINT NOT NULL,
    professionalName VARCHAR(40) NOT NULL,
    professionalSurname VARCHAR(40) NOT NULL,
    professionalPassword VARCHAR(20) NOT NULL,
    professionalEmail VARCHAR(100) NOT NULL,
    PRIMARY KEY (professionalId),
    CONSTRAINT FK_Professional_Company FOREIGN KEY (companyId) REFERENCES Company(companyId)
);

CREATE TABLE Representative (
    representativeId TINYINT IDENTITY(1,1) NOT NULL,
    companyId TINYINT NOT NULL,
    representativeName VARCHAR(40) NOT NULL,
    representativeSurname VARCHAR(40) NOT NULL,
    representativeEmail VARCHAR(100) NOT NULL,
    representativePhone VARCHAR(20) NOT NULL,
    PRIMARY KEY (representativeId),
    CONSTRAINT FK_Representative_Company FOREIGN KEY (companyId) REFERENCES Company(companyId),
);

CREATE TABLE Interview (
    interviewId TINYINT IDENTITY(1,1) NOT NULL,
    representativeId TINYINT NOT NULL,
    interviewDate SMALLDATETIME NOT NULL,
    interviewStatus VARCHAR(40) CHECK (interviewStatus IN ('Realizada', 'No realizada', 'Cancelada')) DEFAULT ('No realizada'),
    PRIMARY KEY (interviewId),
    CONSTRAINT FK_Interview_Representative FOREIGN KEY (representativeId) REFERENCES Representative(representativeId)
);

CREATE TABLE CompanyData (
    Id TINYINT IDENTITY(1,1) NOT NULL,
    companyId TINYINT NOT NULL,
    dataDescription VARCHAR(200) NOT NULL,
    PRIMARY KEY (Id),
    CONSTRAINT FK_CompanyData_Company FOREIGN KEY (companyId) REFERENCES Company(companyId)
);

CREATE TABLE Department (
    departmentId TINYINT IDENTITY(1,1) NOT NULL,
    companyId TINYINT NOT NULL,
    departmentName VARCHAR(40) NOT NULL,
    employeeCount INT NOT NULL,
    PRIMARY KEY (departmentId),
    CONSTRAINT FK_Department_Company FOREIGN KEY (companyId) REFERENCES Company(companyId)
);

CREATE TABLE deptPurpose (
    Id TINYINT IDENTITY(1,1) NOT NULL,
    departmentId TINYINT NOT NULL,
    description VARCHAR(200) NOT NULL,
    PRIMARY KEY (Id),
    CONSTRAINT FK_deptPurpose_Department FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE deptIssue (
    Id TINYINT IDENTITY(1,1) NOT NULL,
    departmentId TINYINT NOT NULL,
    description VARCHAR(200) NOT NULL,
    PRIMARY KEY (Id),
    CONSTRAINT FK_deptIssue_Department FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE Project (
    projectId TINYINT IDENTITY(1,1) NOT NULL,
    companyId TINYINT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    PRIMARY KEY (projectId),
    CONSTRAINT FK_Project_Company FOREIGN KEY (companyId) REFERENCES Company(companyId)
);

CREATE TABLE projectData (
	Id TINYINT identity(1,1) unique NOT NULL,
	projectId TINYINT NOT NULL,	
	description VARCHAR(500) NOT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT FK_projectData_Project FOREIGN KEY(projectId) REFERENCES Project(projectId)
);

CREATE TABLE projectTask (
	Id TINYINT identity(1,1) unique NOT NULL,
	deptId TINYINT NOT NULL,
	projectId TINYINT NOT NULL,
	name VARCHAR(60) NOT NULL,
	description VARCHAR(500) NOT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT FK_projectTask_Department FOREIGN KEY(deptId) REFERENCES Department(departmentId),
	CONSTRAINT FK_projectData_Project FOREIGN KEY(projectId) REFERENCES Project(projectId)
);

CREATE TABLE profProject (
    Id TINYINT identity(1,1) unique NOT NULL,
    projectId TINYINT NOT NULL,
    profId TINYINT NOT NULL,
    PRIMARY KEY (Id),
    CONSTRAINT FK_profProject_Project FOREIGN KEY(projectId) REFERENCES Project(projectId),
    CONSTRAINT FK_profProject_Professional FOREIGN KEY (profId) REFERENCES Professional(professionalId)
);

CREATE TABLE profOccupation (
    Id TINYINT identity(1,1) unique NOT NULL,
	profId TINYINT NOT NULL,
	name VARCHAR(60) NOT NULL,
	description VARCHAR(60) NOT NULL,
    PRIMARY KEY (Id),
    CONSTRAINT FK_profOccupation_Proffesional FOREIGN KEY(profId) REFERENCES Professional(professionalId),
);

CREATE TABLE profTask (
    Id TINYINT identity(1,1) unique NOT NULL,
	profId TINYINT NOT NULL,
	taskId TINYINT NOT NULL,
	PRIMARY KEY (Id),
    CONSTRAINT FK_profTask_Professional FOREIGN KEY(profId) REFERENCES Professional(professionalId),
    CONSTRAINT FK_profTask_projectTask FOREIGN KEY(taskId) REFERENCES projectTask(Id),
);


-- Datos de prueba
INSERT INTO Company (companyName, companyType) VALUES 
('TechNova', 'Tecnología')
,('BioLife', 'Salud')
,('EcoBuild', 'Construcción')
,('EduPlus', 'Educación')
,('FinSmart', 'Finanzas');

INSERT INTO Professional (companyId, professionalName, professionalSurname, professionalPassword, professionalEmail)
VALUES 
(1, 'Ana', 'Torres', 'pass123', 'ana@technova.com')
,(2, 'Luis', 'Martínez', 'lmart2024', 'luis@biolife.com')
,(3, 'Sofía', 'Gómez', 'sofi456', 'sofia@ecobuild.com')
,(4, 'Carlos', 'Rivas', 'car789', 'carlos@eduplus.com')
,(5, 'Marina', 'Díaz', 'mdpass', 'marina@finsmart.com');

INSERT INTO Representative(companyId, representativeName, representativeSurname, representativeEmail, representativePhone) VALUES 
(1, 'Jorge', 'Méndez', 'jorge@technova.com', '111-222-333'),
(2, 'Patricia', 'Suárez', 'patricia@biolife.com', '222-333-444'),
(3, 'Daniel', 'León', 'daniel@ecobuild.com', '333-444-555'),
(4, 'Clara', 'Nuñez', 'clara@eduplus.com', '444-555-666'),
(5, 'Alberto', 'Fernández', 'alberto@finsmart.com', '555-666-777');

INSERT INTO Interview(representativeId, interviewDate, interviewStatus) 
VALUES
(1, '2025-07-01', 'Realizada'),
(2, '2025-07-02', 'No realizada'),
(3, '2025-07-03', 'Cancelada'),
(4, '2025-07-04', 'Realizada'),
(5, '2025-07-05', 'No realizada');

INSERT INTO CompanyData (companyId, dataDescription) VALUES 
(1, 'Empresa de software enfocada en IA.'),
(2, 'Laboratorio especializado en vacunas.'),
(3, 'Constructora ecológica.'),
(4, 'Instituto educativo digital.'),
(5, 'Fintech de préstamos y seguros.');

INSERT INTO Department(companyId, departmentName,employeeCount) VALUES 
(1, 'Desarrollo', 25),
(2, 'Investigación', 18),
(3, 'Proyectos', 20),
(4, 'Docencia', 15),
(5, 'Análisis de Riesgo', 10);

INSERT INTO deptPurpose(departmentId, description) VALUES 
(1, 'Desarrollar nuevas plataformas de IA.')
,(2, 'Investigar efectos secundarios.')
,(3, 'Supervisión de obras verdes.')
,(4, 'Crear programas educativos online.')
,(5, 'Evaluar solvencia de clientes.');

INSERT INTO deptIssue(departmentId, description) VALUES 
(1, 'Falta de programadores senior.'),
(2, 'Limitación de presupuesto para insumos.'),
(3, 'Escasez de materiales ecológicos.'),
(4, 'Deserción estudiantil.'),
(5, 'Falta de datos actualizados.');

INSERT INTO Project(companyId, startDate, endDate) VALUES 
(1, '2025-06-01', '2025-12-01'),
(2, '2025-05-15', '2025-11-15'),
(3, '2025-04-10', '2025-10-10'),
(4, '2025-03-20', '2025-09-20'),
(5, '2025-02-01', '2025-08-01');


INSERT INTO projectData(projectId, description) VALUES 
(1, 'App de predicción médica con IA.'),
(2, 'Desarrollo de vacuna experimental.'),
(3, 'Construcción de escuela autosustentable.'),
(4, 'Plataforma para enseñanza virtual.'),
(5, 'Sistema de scoring financiero.');


INSERT INTO projectTask(deptId, projectId, name, description) VALUES 
(1, 1, 'Frontend', 'Diseño de interfaz web'),
(2, 2, 'Testeo', 'Pruebas de laboratorio'),
(3, 3, 'Supervisión', 'Control de calidad de materiales'),
(4, 4, 'Capacitación', 'Formación docente online'),
(5, 5, 'Modelado', 'Modelos de predicción de riesgo');

INSERT INTO profProject(projectId, profId) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO profOccupation(profId, name, description) VALUES 
(1, 'Desarrollador Full Stack', 'Construcción de aplicaciones web'),
(2, 'Analista de Datos', 'Procesamiento de información médica'),
(3, 'Arquitecto Técnico', 'Diseño de estructuras ecológicas'),
(4, 'Docente Virtual', 'Capacitación online en nuevas tecnologías'),
(5, 'Analista Financiero', 'Evaluación de riesgo y crédito');

INSERT INTO profTask(profId, taskId) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);