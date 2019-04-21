USE [CRCTT]
GO
SET IDENTITY_INSERT [dbo].[Menus] ON 

INSERT [dbo].[Menus] ([id], [title], [menuId], [type], [icon], [url], [isActive], [createdBy], [updatedBy], [parentId], [displayOrder], [createdAt], [updatedAt]) VALUES (1, N'Admin', N'admin', N'collapse', N'add_box', NULL, 1, N'Shailendra Tiwari (test@gmail.com)', N'Paras Tripathi (test@gmail.com)', NULL, 1, CAST(N'2018-07-13T22:25:13.4100000+00:00' AS DateTimeOffset), CAST(N'2018-09-03T07:45:50.0690000+00:00' AS DateTimeOffset))
INSERT [dbo].[Menus] ([id], [title], [menuId], [type], [icon], [url], [isActive], [createdBy], [updatedBy], [parentId], [displayOrder], [createdAt], [updatedAt]) VALUES (2, N'Menus', N'menus', N'item', N'apps', N'/pages/menus', 1, N'Shailendra Tiwari (test@gmail.com)', N'Shailendra Tiwari (test@gmail.com)', 1, 1, CAST(N'2018-07-13T22:26:21.1000000+00:00' AS DateTimeOffset), CAST(N'2019-04-21T18:07:29.6820000+00:00' AS DateTimeOffset))
INSERT [dbo].[Menus] ([id], [title], [menuId], [type], [icon], [url], [isActive], [createdBy], [updatedBy], [parentId], [displayOrder], [createdAt], [updatedAt]) VALUES (3, N'Roles', N'roles', N'item', N'grid_on', N'/pages/roles', 1, N'Shailendra Tiwari (test@gmail.com)', N'Shailendra Tiwari (test@gmail.com)', 1, 1, CAST(N'2018-07-13T22:58:33.9300000+00:00' AS DateTimeOffset), CAST(N'2019-04-21T18:07:37.3540000+00:00' AS DateTimeOffset))
INSERT [dbo].[Menus] ([id], [title], [menuId], [type], [icon], [url], [isActive], [createdBy], [updatedBy], [parentId], [displayOrder], [createdAt], [updatedAt]) VALUES (4, N'Users', N'users', N'item', N'account_box', N'/pages/users', 1, N'Shailendra Tiwari (test@gmail.com)', N'Shailendra Tiwari (test@gmail.com)', NULL, 3, CAST(N'2018-07-13T23:01:04.0680000+00:00' AS DateTimeOffset), CAST(N'2019-04-21T18:06:49.8970000+00:00' AS DateTimeOffset))
INSERT [dbo].[Menus] ([id], [title], [menuId], [type], [icon], [url], [isActive], [createdBy], [updatedBy], [parentId], [displayOrder], [createdAt], [updatedAt]) VALUES (5, N'Organisations', N'organisations', N'item', N'account_balance_wallet', N'/pages/organisations', 1, N'Shailendra Tiwari (test@gmail.com)', N'Shailendra Tiwari (test@gmail.com)', NULL, 6, CAST(N'2018-07-13T23:03:07.5090000+00:00' AS DateTimeOffset), CAST(N'2019-04-21T18:06:41.1140000+00:00' AS DateTimeOffset))
INSERT [dbo].[Menus] ([id], [title], [menuId], [type], [icon], [url], [isActive], [createdBy], [updatedBy], [parentId], [displayOrder], [createdAt], [updatedAt]) VALUES (6, N'Profile', N'profile', N'item', N'account_circle', N'/pages/profile', 1, N'Shailendra Tiwari (test@gmail.com)', N'Paras Tripathi (test@gmail.com)', NULL, 100, CAST(N'2018-07-13T23:04:35.7410000+00:00' AS DateTimeOffset), CAST(N'2018-09-03T07:46:12.4740000+00:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[Menus] OFF
