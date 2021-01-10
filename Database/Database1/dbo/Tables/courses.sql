CREATE TABLE [dbo].[courses] (
    [id]              INT           IDENTITY (1, 1) NOT NULL,
    [name]            NVARCHAR (50) NULL,
    [description]     NVARCHAR (50) NULL,
    [createdby]       INT           NULL,
    [assignedteacher] INT           NULL,
    CONSTRAINT [PK_courses] PRIMARY KEY CLUSTERED ([id] ASC)
);

