CREATE TABLE [dbo].[user] (
    [id]               INT             IDENTITY (1, 1) NOT NULL,
    [fname]            NVARCHAR (50)   NULL,
    [lname]            NVARCHAR (50)   NULL,
    [email]            NVARCHAR (50)   NULL,
    [identificationno] NVARCHAR (50)   NULL,
    [passwordhash]     VARBINARY (MAX) NULL,
    [passwordsalt]     VARBINARY (MAX) NULL,
    [role]             INT             NULL,
    CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED ([id] ASC)
);

