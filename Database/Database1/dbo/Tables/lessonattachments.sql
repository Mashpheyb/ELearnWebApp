CREATE TABLE [dbo].[lessonattachments]
(
	[id] INT NOT NULL IDENTITY, 
    [lessonid] INT NULL, 
    [url] NVARCHAR(MAX) NULL, 
    [filename] TEXT NULL, 
    [type] NVARCHAR(50) NULL, 
    CONSTRAINT [PK_lessonattachments] PRIMARY KEY ([id]) 
)
