set quoted_identifier on
go
set ansi_nulls on
go
set ansi_padding on
go

--create database EventatorAPIv1
use EventatorAPIv1
create database [EventatorAPIv1]
use EventatorAPIv1
create table [dbo].[EventInfo]
(
	[idEventInfo] [int] not null identity(1,1),
	[name] [varchar] (50) not null,
	[nameHash] [varchar] (64) not null,
	[date] [varchar] (10) null,
	[limitations] [float] null,
	[description] [varchar] (300) null,
  [isDelete] [bit] not null DEFAULT 0

	constraint [pk_EventInfo] primary key clustered
	([idEventInfo] ASC) on [PRIMARY],
	constraint [CH_EventInfo_Date] check ([date] like '__.__.__'),
	constraint [CH_Limitations] check ([Limitations] > 0)
)
go

create table [dbo].[Event]
(
	[idEvent] [int] not null identity(1,1),
	[adminPassHash] [varchar] (64) not null,
	[eventInfoID] [int] not null,
	[editPassHash] [varchar] (64) null,
	[code] [varchar](5) not null,
	[codeHash] [varchar] (64) not null,
  [isDelete] [bit] not null DEFAULT 0


	constraint [pk_Event] primary key clustered
	([idEvent] ASC) on [PRIMARY],
	constraint [fk_eventInfo] foreign key ([eventInfoid])
	references [dbo].[eventInfo] ([ideventInfo]),

	constraint [CH_Event_ID] check ([code] like '#____')
)
go

create table [dbo].[User]
(
	[idUser] [int] not null identity(1,1),
	[Name] [varchar] (30) not null,
	[EventID] [int] not null,
  [isDelete] [bit] not null DEFAULT 0

	constraint [pk_User] primary key clustered
	([idUser] ASC) on [PRIMARY],
	constraint [fk_event] foreign key ([eventid])
	references [dbo].[event] ([idevent])
)
go

create table [dbo].[Log]
(
	[idLog] [int] not null identity(1,1),
	[date] [varchar] (64) not null,
	[time] [varchar] (64) not null,
	[action] [varchar] (64) not null,
	[UserID] [int] not null,
  [isDelete] [bit] not null DEFAULT 0


	constraint [pk_Log] primary key clustered
	([idLog] ASC) on [PRIMARY],
	constraint [fk_User] foreign key ([UserID])
	references [dbo].[User] ([idUser]),

	constraint [CH_Log_Date] check ([date] like '__.__.__'),
	constraint [CH_Log_Time] check ([Time] like '__:__'),
)
go

create table [dbo].[ProductGroup]
(
	[idProductGroup] [int] not null identity(1,1),
	[Name] [varchar] (64) not null,
	[description] [varchar] (300) null,
	[eventID] [int] not null,
  [isDelete] [bit] not null DEFAULT 0

	constraint [pk_ProductGroup] primary key clustered
	([idProductGroup] ASC) on [PRIMARY],
	constraint [fk_event_productgroup] foreign key ([eventid])
	references [dbo].[event] ([idevent])
)
go

create table [dbo].[Product]
(
	[idProduct] [int] not null identity(1,1),
	[Name] [varchar] (64) not null,
	[price] [float] not null,
	[ProductGroupID] [int] not null,
	[count] [int] not null,
	[description] [varchar] (300) null,
  [isDelete] [bit] not null DEFAULT 0

	constraint [pk_Product] primary key clustered
	([idProduct] ASC) on [PRIMARY],
	constraint [fk_ProductGroup] foreign key ([ProductGroupid])
	references [dbo].[ProductGroup] ([idProductGroup]),

	constraint [CH_count] check ([count] >= 0),
	constraint [CH_price] check ([price] >= 0)
)
go

CREATE trigger [dbo].[ProductGroupDelProduct] on [dbo].ProductGroup
after Update 
as 
declare @isDel [bit] = (select idDelete from INSERTED)
if @isDel = 1
begin
	declare @ID_ProductGroup [int] = (select id_ProductGroup from INSERTED)
	UPDATE Product SET idDelete = '1' WHERE ProductGroup_ID = @ID_ProductGroup AND idDelete = '0'
end
go

CREATE trigger [dbo].[EventDelProductGroup] on [dbo].[Event]
after Update 
as 
declare @isDel [bit] = (select idDelete from INSERTED)
if @isDel = 1
begin
	declare @ID_Event [int] = (select id_Event from INSERTED)
	UPDATE ProductGroup SET idDelete = '1' WHERE Event_ID = @ID_Event AND idDelete = '0'
end
go

CREATE trigger [dbo].[EventInfoDelEvent] on [dbo].[EventInfo]
after Update 
as 
declare @isDel [bit] = (select idDelete from INSERTED)
if @isDel = 1
begin
	declare @ID_EventInfo [int] = (select id_EventInfo from INSERTED)
	UPDATE [Event] SET idDelete = '1' WHERE EventInfo_ID = @ID_EventInfo AND idDelete = '0'
end
go