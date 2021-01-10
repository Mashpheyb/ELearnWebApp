CREATE TABLE [dbo].[courselessons]
(
	[id] INT NOT NULL IDENTITY, 
    [courseid] INT NULL, 
    [title] NVARCHAR(50) NULL, 
    [description] TEXT NULL, 
    [exercise] TEXT NULL, 
    [createdon] DATETIME NULL, 
    [createdby] INT NULL, 
    CONSTRAINT [PK_courselessons] PRIMARY KEY ([id]) 
)
