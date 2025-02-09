USE [master]
GO
/****** Object:  Database [DemoProject3]    Script Date: 12/27/2023 3:03:53 PM ******/
CREATE DATABASE [DemoProject3]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DemoProject3', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\DemoProject3.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DemoProject3_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\DemoProject3_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [DemoProject3] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DemoProject3].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DemoProject3] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DemoProject3] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DemoProject3] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DemoProject3] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DemoProject3] SET ARITHABORT OFF 
GO
ALTER DATABASE [DemoProject3] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DemoProject3] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DemoProject3] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DemoProject3] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DemoProject3] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DemoProject3] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DemoProject3] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DemoProject3] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DemoProject3] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DemoProject3] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DemoProject3] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DemoProject3] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DemoProject3] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DemoProject3] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DemoProject3] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DemoProject3] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [DemoProject3] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DemoProject3] SET RECOVERY FULL 
GO
ALTER DATABASE [DemoProject3] SET  MULTI_USER 
GO
ALTER DATABASE [DemoProject3] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DemoProject3] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DemoProject3] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DemoProject3] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DemoProject3] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DemoProject3] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'DemoProject3', N'ON'
GO
ALTER DATABASE [DemoProject3] SET QUERY_STORE = ON
GO
ALTER DATABASE [DemoProject3] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [DemoProject3]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Addresses]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Addresses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NameAddress] [nvarchar](max) NOT NULL,
	[Id_Area] [int] NULL,
 CONSTRAINT [PK_Addresses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Areas]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Areas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NameArea] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Areas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClaimDetails]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClaimDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaimNumber] [nvarchar](max) NOT NULL,
	[PolicyNumber] [nvarchar](max) NOT NULL,
	[PolicyStartDate] [datetime2](7) NOT NULL,
	[PolicyEndDate] [datetime2](7) NOT NULL,
	[CusName] [nvarchar](max) NOT NULL,
	[PlaceOfAccident] [nvarchar](max) NOT NULL,
	[DateOfAccident] [datetime2](7) NOT NULL,
	[InsuredAmount] [decimal](18, 2) NOT NULL,
	[ClaimableAmount] [decimal](18, 2) NOT NULL,
	[BankAccountNumber] [decimal](18, 2) NOT NULL,
	[Cus_Id] [int] NULL,
	[NameOfBank] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_ClaimDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClaimLists]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClaimLists](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PolicyNumber] [nvarchar](max) NOT NULL,
	[ClaimNumber] [nvarchar](max) NOT NULL,
	[CusName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_ClaimLists] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Subject] [nvarchar](max) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Expenses]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Expenses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DateOfExpense] [datetime2](7) NOT NULL,
	[TypeOfExpense] [nvarchar](max) NOT NULL,
	[AmountOfExpense] [float] NOT NULL,
 CONSTRAINT [PK_Expenses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ForbiddenWords]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ForbiddenWords](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[word] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_ForbiddenWords] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ForgetPass]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ForgetPass](
	[For_Id] [int] IDENTITY(1,1) NOT NULL,
	[Cus_Id] [int] NOT NULL,
	[Cus_Email] [nvarchar](max) NOT NULL,
	[Code] [nvarchar](max) NOT NULL,
	[Status] [int] NOT NULL,
 CONSTRAINT [PK_ForgetPass] PRIMARY KEY CLUSTERED 
(
	[For_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaintenanceStatusS]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaintenanceStatusS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MainStatus] [int] NOT NULL,
 CONSTRAINT [PK_MaintenanceStatusS] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDTOs]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDTOs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Cus_Id] [int] NOT NULL,
	[Type_Insurance] [nvarchar](max) NOT NULL,
	[Name_Of_Vehicle_Owner] [nvarchar](max) NOT NULL,
	[Code_Order] [nvarchar](max) NOT NULL,
	[DateFrom] [datetime2](7) NOT NULL,
	[DateTo] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_OrderDTOs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Vat] [int] NOT NULL,
	[Cus_Id] [int] NOT NULL,
	[LicensePlates] [nvarchar](max) NULL,
	[ChassisNumber] [nvarchar](max) NOT NULL,
	[EngineNumber] [nvarchar](max) NOT NULL,
	[Number_Of_Seats] [int] NOT NULL,
	[Payload] [int] NOT NULL,
	[Price] [int] NOT NULL,
	[Type_Insurance] [nvarchar](max) NULL,
	[Code_Order] [nvarchar](max) NOT NULL,
	[CMND] [nvarchar](max) NULL,
	[DateFrom] [datetime2](7) NOT NULL,
	[DateTo] [datetime2](7) NOT NULL,
	[Duration] [int] NOT NULL,
	[Level_Responsibility_For_People] [int] NOT NULL,
	[Level_Responsibility_For_The_Property] [int] NOT NULL,
	[Name_Of_Vehicle_Owner] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](max) NULL,
	[Total] [decimal](18, 2) NOT NULL,
	[Vehicle_Owner_Address] [nvarchar](max) NOT NULL,
	[Vehicle_Owner_Tax_Code] [nvarchar](max) NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id_Product] [int] IDENTITY(1,1) NOT NULL,
	[Contract_Name] [nvarchar](50) NOT NULL,
	[Id_Type_Insurance] [int] NOT NULL,
	[VAT] [int] NOT NULL,
	[Limited_Years] [int] NOT NULL,
	[Level_Responsibility_For_People] [int] NOT NULL,
	[Level_Responsibility_For_The_Property] [int] NOT NULL,
	[Reason] [nvarchar](1000) NOT NULL,
	[Damages] [int] NOT NULL,
	[Price] [int] NOT NULL,
	[Number_Of_Seats] [int] NOT NULL,
	[Payload] [int] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id_Product] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type_Insurances]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type_Insurances](
	[Id_Type_Insurance] [int] IDENTITY(1,1) NOT NULL,
	[Type] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Title] [nvarchar](max) NULL,
 CONSTRAINT [PK_Type_Insurances] PRIMARY KEY CLUSTERED 
(
	[Id_Type_Insurance] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Cus_Id] [int] IDENTITY(1,1) NOT NULL,
	[Cus_Name] [nvarchar](30) NOT NULL,
	[Cus_Email] [nvarchar](max) NOT NULL,
	[Cus_Password] [nvarchar](max) NOT NULL,
	[Cus_ADD] [nvarchar](70) NOT NULL,
	[Cus_Phone] [nvarchar](10) NOT NULL,
	[Role] [nvarchar](max) NULL,
	[Status] [int] NOT NULL,
	[CreateAt] [datetime2](7) NULL,
	[Code] [nvarchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Cus_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleErrors]    Script Date: 12/27/2023 3:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleErrors](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaimNumber] [nvarchar](max) NOT NULL,
	[ErrorOfVehicle] [nvarchar](max) NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_VehicleErrors] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231125085848_Usertbproject', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231125094828_NewUsers', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231129155316_epro3p1', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231201154611_epro3p3', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231204042225_epro3p4', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231204042738_epro3p5', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231204051732_epro3p6', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231204135322_tbepro3p6', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231204162452_tbepro3p7', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231205045217_tbepro3p8', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231205124335_epro3p', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231206050012_tbepro3p9', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231207023302_tbepro3p10', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231207024719_tbepro3p11', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231207025556_tbepro3p12', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231207040817_tbepro3p13', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231207060756_tbepro3p14', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231207063821_tbepro3p15', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231208044514_tbepro3p16', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231211043728_tbepro3p17', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231211044316_tbepro3p19', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231211142631_tbepro3p20', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231215034334_tbepro3p21', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231216162503_createatuserepro3', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231217020526_descriptionepro3', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231221044631_phucepro3', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231222075334_eproêduc', N'6.0.9')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231222075404_epro3duc', N'6.0.9')
GO
SET IDENTITY_INSERT [dbo].[Addresses] ON 

INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (15, N'Số 222 Đường Lê Hoàn, Phường Hai Bà Trưng, Thành Phố Phủ Lý, Tỉnh Hà Nam', 9)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (16, N'Văn Phòng Tầng 2, Mặt Tiền Sảnh C, Tòa Nhà Trung Tâm Thương Mại Đông Á, Tổ 7, Phường Đồng Quang, Thành Phố Thái Nguyên, Tỉnh Thái Nguyên', 9)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (17, N'Phòng 201, Tầng 2, Tòa Nhà Thành Đạt 1, Số 3 Đường Lê Thánh Tông, Phường Máy Tơ, Quận Ngô Quyền, Thành Phố Hải Phòng', 9)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (18, N'Căn Số 19, Tầng 6, Số 360 Đại Lộ Nguyễn Lương Bằng, Phường Thanh Bình, Thành Phố Hải Dương, Tỉnh Hải Dương', 9)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (19, N'529 Hoàng Liên, Phường Kim Tân, Thành Phố Lào Cai, Tỉnh Lào Cai', 9)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (20, N'Số Nhà 87, Tổ 1, Khu Tân Phú, Đường Trần Phú, Phường Tân Dân, Thành Phố Việt Trì, Tỉnh Phú Thọ', 9)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (21, N'522 Đường Xương Giang, Phường Xương Giang, Thành Phố Bắc Giang, Tỉnh Bắc Giang', 9)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (22, N'30 Đường Mạc Đĩnh Chi, Phường 4, Thành Phố Đà Lạt, Tỉnh Lâm Đồng', 7)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (23, N'49 Lý Thái Tổ, Phường Tân Lợi, Thành Phố Buôn Ma Thuột, Tỉnh Đăk Lăk', 7)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (24, N'229 Trưng Nữ Vương, Phường An Mỹ, Thành Phố Tam Kỳ, Tỉnh Quảng Nam', 7)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (25, N'88 Nguyễn Chí Thanh, Phường Hải Châu I, Quận Hải Châu, Thành Phố Đà Nẵng', 7)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (26, N'22A Đường Số 7, Phường An Phú, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh', 5)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (27, N'26 Hoàng Kế Viêm, Phường 12, Quận Tân Bình, Thành Phố Hồ Chí Minh', 5)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (28, N'5/4C Đồng Khởi, KP1, Phường Tân Mai, Thành Phố Biên Hòa,Tỉnh Đồng Nai', 5)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (29, N'384 Khu Phố Thương Mại, Đường 30/4, Khu Phố 1, Phường 3, Thành Phố Tây Ninh, Tỉnh Tây Ninh', 5)
INSERT [dbo].[Addresses] ([Id], [NameAddress], [Id_Area]) VALUES (30, N'173/15/2 Khuông Việt, Phú Trung, Tân Phú, Thành phố Hồ Chí Minh', 5)
SET IDENTITY_INSERT [dbo].[Addresses] OFF
GO
SET IDENTITY_INSERT [dbo].[Areas] ON 

INSERT [dbo].[Areas] ([Id], [NameArea]) VALUES (5, N'South')
INSERT [dbo].[Areas] ([Id], [NameArea]) VALUES (7, N'Central')
INSERT [dbo].[Areas] ([Id], [NameArea]) VALUES (9, N'North')
SET IDENTITY_INSERT [dbo].[Areas] OFF
GO
SET IDENTITY_INSERT [dbo].[ClaimDetails] ON 

INSERT [dbo].[ClaimDetails] ([Id], [ClaimNumber], [PolicyNumber], [PolicyStartDate], [PolicyEndDate], [CusName], [PlaceOfAccident], [DateOfAccident], [InsuredAmount], [ClaimableAmount], [BankAccountNumber], [Cus_Id], [NameOfBank]) VALUES (1, N'thdghd', N'dthtdh', CAST(N'2023-12-04T04:22:45.4140000' AS DateTime2), CAST(N'2023-12-04T04:22:45.4140000' AS DateTime2), N'tdhd', N'htd', CAST(N'2023-12-04T04:22:45.4140000' AS DateTime2), CAST(4.00 AS Decimal(18, 2)), CAST(5.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, N'')
INSERT [dbo].[ClaimDetails] ([Id], [ClaimNumber], [PolicyNumber], [PolicyStartDate], [PolicyEndDate], [CusName], [PlaceOfAccident], [DateOfAccident], [InsuredAmount], [ClaimableAmount], [BankAccountNumber], [Cus_Id], [NameOfBank]) VALUES (2, N'POL5080', N'POC838', CAST(N'2023-12-22T00:00:00.0000000' AS DateTime2), CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), N'phat', N'12 sfudjhfk', CAST(N'2023-12-22T00:00:00.0000000' AS DateTime2), CAST(30000.00 AS Decimal(18, 2)), CAST(15000.00 AS Decimal(18, 2)), CAST(24524.00 AS Decimal(18, 2)), NULL, N'acb bank')
INSERT [dbo].[ClaimDetails] ([Id], [ClaimNumber], [PolicyNumber], [PolicyStartDate], [PolicyEndDate], [CusName], [PlaceOfAccident], [DateOfAccident], [InsuredAmount], [ClaimableAmount], [BankAccountNumber], [Cus_Id], [NameOfBank]) VALUES (3, N'POL23390', N'POC128', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-01-05T00:00:00.0000000' AS DateTime2), N'helo', N'why why why', CAST(N'2023-12-20T00:00:00.0000000' AS DateTime2), CAST(30000.00 AS Decimal(18, 2)), CAST(15000.00 AS Decimal(18, 2)), CAST(767475635.00 AS Decimal(18, 2)), NULL, N'ACB bank')
SET IDENTITY_INSERT [dbo].[ClaimDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[ClaimLists] ON 

INSERT [dbo].[ClaimLists] ([Id], [PolicyNumber], [ClaimNumber], [CusName]) VALUES (1, N'POC838', N'POL5080', N'phat')
INSERT [dbo].[ClaimLists] ([Id], [PolicyNumber], [ClaimNumber], [CusName]) VALUES (2, N'POC128', N'POL23390', N'helo')
SET IDENTITY_INSERT [dbo].[ClaimLists] OFF
GO
SET IDENTITY_INSERT [dbo].[Expenses] ON 

INSERT [dbo].[Expenses] ([Id], [DateOfExpense], [TypeOfExpense], [AmountOfExpense]) VALUES (1, CAST(N'2023-06-07T04:31:10.5000000' AS DateTime2), N'60 new tables', 450)
INSERT [dbo].[Expenses] ([Id], [DateOfExpense], [TypeOfExpense], [AmountOfExpense]) VALUES (2, CAST(N'2023-12-25T23:49:00.0000000' AS DateTime2), N'Motion Monitor Arm T6 Pro', 790)
INSERT [dbo].[Expenses] ([Id], [DateOfExpense], [TypeOfExpense], [AmountOfExpense]) VALUES (3, CAST(N'2023-09-21T00:08:00.0000000' AS DateTime2), N'WARRIOR Paladin Series WGT604', 3490)
INSERT [dbo].[Expenses] ([Id], [DateOfExpense], [TypeOfExpense], [AmountOfExpense]) VALUES (4, CAST(N'2023-12-25T00:09:00.0000000' AS DateTime2), N'Pegboard HyperWork PG02 White', 540)
INSERT [dbo].[Expenses] ([Id], [DateOfExpense], [TypeOfExpense], [AmountOfExpense]) VALUES (5, CAST(N'2025-07-20T00:29:00.0000000' AS DateTime2), N'Motion Monitor Arm T9 Pro', 1280)
INSERT [dbo].[Expenses] ([Id], [DateOfExpense], [TypeOfExpense], [AmountOfExpense]) VALUES (6, CAST(N'2017-06-25T00:30:00.0000000' AS DateTime2), N'HyperWork HPW CH01', 282)
SET IDENTITY_INSERT [dbo].[Expenses] OFF
GO
SET IDENTITY_INSERT [dbo].[ForbiddenWords] ON 

INSERT [dbo].[ForbiddenWords] ([Id], [word]) VALUES (1, N'fuck')
INSERT [dbo].[ForbiddenWords] ([Id], [word]) VALUES (2, N'bitch')
SET IDENTITY_INSERT [dbo].[ForbiddenWords] OFF
GO
SET IDENTITY_INSERT [dbo].[ForgetPass] ON 

INSERT [dbo].[ForgetPass] ([For_Id], [Cus_Id], [Cus_Email], [Code], [Status]) VALUES (1, 3, N'truongtanphat190703@gmail.com', N'Ct80h2z6EcFSOE2DOM0s', 1)
INSERT [dbo].[ForgetPass] ([For_Id], [Cus_Id], [Cus_Email], [Code], [Status]) VALUES (2, 3, N'truongtanphat190703@gmail.com', N'kiJlooaRABAoK3oAXoi4', 1)
INSERT [dbo].[ForgetPass] ([For_Id], [Cus_Id], [Cus_Email], [Code], [Status]) VALUES (1002, 3, N'truongtanphat190703@gmail.com', N'LSafAArHUPj8RxgREYwe', 1)
INSERT [dbo].[ForgetPass] ([For_Id], [Cus_Id], [Cus_Email], [Code], [Status]) VALUES (1003, 3, N'truongtanphat190703@gmail.com', N'Q8tcBXllMVyIghTVmlji', 0)
INSERT [dbo].[ForgetPass] ([For_Id], [Cus_Id], [Cus_Email], [Code], [Status]) VALUES (2002, 3, N'truongtanphat190703@gmail.com', N'uouDEKKpG2uIJmyEijq8', 0)
INSERT [dbo].[ForgetPass] ([For_Id], [Cus_Id], [Cus_Email], [Code], [Status]) VALUES (2003, 3, N'truongtanphat190703@gmail.com', N'Eou1M388XqFUNveyOfCC', 1)
INSERT [dbo].[ForgetPass] ([For_Id], [Cus_Id], [Cus_Email], [Code], [Status]) VALUES (2004, 2018, N'Phanphan9a4@gmail.com', N'ohbfTKtuRmDB8zdpoGEd', 1)
SET IDENTITY_INSERT [dbo].[ForgetPass] OFF
GO
SET IDENTITY_INSERT [dbo].[MaintenanceStatusS] ON 

INSERT [dbo].[MaintenanceStatusS] ([Id], [MainStatus]) VALUES (1, 0)
SET IDENTITY_INSERT [dbo].[MaintenanceStatusS] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDTOs] ON 

INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (21, 2, N'Motorbike over 50cc', N'phat', N'38128e0c-91a7-4b38-8727-16af47b7b711', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (22, 2, N'Motorbike under 50cc', N'dcdcd', N'b227b42f-57e0-49bd-95f0-7e8065b0ec62', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2026-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (23, 2, N'Motorbike under 50cc', N'fvfv', N'35871d0b-1ad7-467a-b2be-f18035243b0a', CAST(N'2023-12-17T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-17T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (24, 2, N'Motorbike under 50cc', N'cscsc', N'0cee572c-0a54-4274-8861-52a1146d7844', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (25, 2, N'Motorbike under 50cc', N'dvdvdv', N'78769361-5269-4c79-9e5b-4c31a66cbb46', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (26, 2, N'Motorbike under 50cc', N'jjhjhjhjh', N'58bc6c5f-e865-4bb7-8e7e-6ff335973cf7', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (27, 2, N'Motorbike under 50cc', N'cdcdcd', N'fe65bbc0-d532-4a9f-865e-275e45c77c4f', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (28, 2, N'Motorbike under 50cc', N'scsc', N'19d52119-790c-4910-b99c-3e49f25646b1', CAST(N'2023-12-29T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-29T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (29, 2, N'Motorbike under 50cc', N'xcxcx', N'45b4daf3-8d01-46ca-8778-2c8720f88564', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (30, 2, N'Motorbike under 50cc', N'vfvfvf', N'16008193-909c-4aae-8285-f008113a8144', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-14T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (31, 2, N'Motorbike under 50cc', N'vbv', N'205f325d-a16d-4835-a3ed-a55e0cc7227c', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (32, 2, N'Motorbike over 50cc', N'vfvfv', N'3007f404-c148-45e9-b098-134a9fc154f4', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (33, 2, N'Motorbike under 50cc', N'sxsx', N'3e64a89f-6542-4a5f-9d48-62738174e07b', CAST(N'2023-12-19T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-19T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (34, 2, N'Motorbike under 50cc', N'cxc', N'bf109553-0359-4072-8891-37ee3a9b1fe0', CAST(N'2023-12-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (35, 2, N'Motorbike under 50cc', N'fvfv', N'c8e71922-f3f2-4049-bf4e-4cd23932f20f', CAST(N'2023-12-19T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (36, 2, N'Motorbike under 50cc', N'cxcxc', N'0d892b7e-849c-433e-ba3a-f6968e4b1df7', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (37, 2, N'Motorbike under 50cc', N'xzxz', N'7ee3401d-ddc4-4e32-95ae-0b10e5f72b86', CAST(N'2023-12-11T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-11T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (38, 2, N'Motorbike under 50cc', N'zczc', N'9ade57ac-f95b-41a4-9b64-6b9ca7c1ac4f', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (39, 2, N'Motorbike under 50cc', N'cdcdc', N'e12d535d-f473-4243-9702-acf8e4785185', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (40, 2, N'Motorbike under 50cc', N'xsxsx', N'50d0de29-5a0a-44c3-9cde-69eee6a10a84', CAST(N'2023-12-27T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (41, 2, N'Motorbike under 50cc', N'cdcdc', N'0d8c2fec-aec1-40a1-9acb-117d130c91c4', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-14T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (42, 2, N'Motorbike under 50cc', N'scscscs', N'10482964-4193-4f6e-803a-40591abe6668', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (43, 2, N'Motorbike under 50cc', N'bgbgb', N'5ae17f71-b258-4420-9802-6744f9a07ff8', CAST(N'2023-12-09T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-09T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (44, 2, N'Motorbike under 50cc', N'cdcdcd', N'5824ac85-5d10-4925-8f3d-d75c5b1328fa', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-14T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (45, 2, N'Motorbike under 50cc', N'cvcvc', N'296d4407-47a1-408c-ac95-e79c17240fdf', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (46, 2, N'Motorbike under 50cc', N'cdcdc', N'e2b69b36-21c4-4553-b55a-722c545eec84', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (47, 3, N'Car Insurance', N'sxsxs', N'd67b2f1a-c0a0-4bc3-9e67-31a2f287f5b3', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (48, 3, N'Motorbike under 50cc', N'ccdcdc', N'bb3a6910-f32e-446f-88c4-ff0c2763b651', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (49, 3, N'Motorbike under 50cc', N'test', N'cf98ef7d-bdc5-4f7c-b40f-40c42f6ecf69', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (50, 3, N'Motorbike under 50cc', N'test2', N'8bf495a6-cf1c-4bda-beb5-ec3072688f30', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (51, 3, N'Motorbike under 50cc', N'test3', N'8150e3d7-ac7a-448e-af2b-f9c757df7016', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (52, 3, N'Motorbike under 50cc', N'test4', N'c4200e32-ff48-44de-b92f-10598fa2c833', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (53, 3, N'Motorbike under 50cc', N'test5', N'06f64a8b-8a67-4006-9761-66859ec1160c', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (54, 3, N'Motorbike under 50cc', N'test6', N'ef6b9663-6269-461b-877d-0c895f3b7b61', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (55, 3, N'Motorbike under 50cc', N'test7', N'4c4f7fae-7bb7-4fd2-a1ad-a719f31e5d3a', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-14T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (56, 3, N'Motorbike under 50cc', N'BONBOB', N'e23dca8a-c79e-450f-9087-047f059eefd3', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (57, 3, N'Motorbike under 50cc', N'test8', N'4b293ce8-8b2a-463c-82fb-69faa2b37f8f', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (58, 3, N'Motorbike under 50cc', N'test9', N'baed4d59-4e60-4cc2-b205-47ba1b6a5a26', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (59, 3, N'Motorbike under 50cc', N'phat', N'8b787298-fdf4-427f-9aa3-3f0c5e3aba40', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (60, 3, N'Motorbike under 50cc', N'BONBOB', N'b33a1ca8-e67c-47b4-8588-4566151aff45', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (61, 3, N'Motorbike under 50cc', N'ccc', N'bbd15f12-ff93-4085-8333-ea254aefd88a', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (62, 3, N'Motorbike under 50cc', N'xsxsx', N'938c262c-1403-47ff-b9b3-93ec583b1fb9', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (63, 3, N'Motorbike under 50cc', N'cdcd', N'65c74ed5-18b7-4d23-b41b-0220759f2e32', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-14T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (64, 3, N'Motorbike under 50cc', N'eeeeeeeeeeee', N'c8bc9874-7712-4fa1-971c-9dacb4a63b00', CAST(N'2023-12-19T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (65, 3, N'Motorbike under 50cc', N'Truong Tan Phat', N'8bc3e33c-25ca-41b4-b29d-53ebf61c5464', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (66, 3, N'Motorbike under 50cc', N'BONBOB', N'7b15d737-753a-4242-b8a3-42e949dc7cc8', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (67, 6, N'Motorbike under 50cc', N'dcdcd', N'bd29ee3e-4f0b-4118-931b-8ceec450a7f3', CAST(N'2023-12-15T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-15T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (1066, 6, N'Car Insurance', N'srgsrgsrg', N'6329bd1d-6d5c-4988-b855-4823b8d5e810', CAST(N'2023-12-23T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (1067, 6, N'Motorbike under 50cc', N'Truong Tan Phat', N'ed01cae4-46e9-48f7-8401-1906dfe770a4', CAST(N'2023-12-31T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-31T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (1068, 2, N'Car Insurance', N'eeeeeeeeeeee', N'67b0687b-f087-400f-8b15-61f7a595a699', CAST(N'2024-02-02T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-02T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (1069, 2, N'Motorbike under 50cc', N'svdfvsdvs', N'6afe1a4d-4335-4c6e-8eea-2f990c2ee521', CAST(N'2024-02-05T00:00:00.0000000' AS DateTime2), CAST(N'2026-02-05T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[OrderDTOs] ([Id], [Cus_Id], [Type_Insurance], [Name_Of_Vehicle_Owner], [Code_Order], [DateFrom], [DateTo]) VALUES (1070, 6, N'3 wheel motorbike', N'Truong Tan Phat', N'c83df714-d771-49e8-b69c-84660f7c38f6', CAST(N'2023-12-25T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[OrderDTOs] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (34, 10, 2, N'', N'xsxsxsx', N'BONBOB', 4, 4, 4, N'Motorbike over 50cc', N'38128e0c-91a7-4b38-8727-16af47b7b711', N'123456789812', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-08T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'phat', N'0706727271', CAST(8.80 AS Decimal(18, 2)), N'173/15/2a khfffff', N'12345678914522')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (35, 10, 2, N'', N'ccdcd', N'cdcd', 2, 0, 2, N'Motorbike under 50cc', N'b227b42f-57e0-49bd-95f0-7e8065b0ec62', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2026-12-13T00:00:00.0000000' AS DateTime2), 3, 6200, 2100, N'dcdcd', N'', CAST(6.60 AS Decimal(18, 2)), N'173/15/2a dcdcd', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (36, 10, 2, N'', N'vfvf', N'fvfv', 2, 0, 2, N'Motorbike under 50cc', N'35871d0b-1ad7-467a-b2be-f18035243b0a', N'', CAST(N'2023-12-17T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-17T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'fvfv', N'', CAST(4.40 AS Decimal(18, 2)), N'vfvf', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (37, 10, 2, N'', N'cscscs', N'ssss', 2, 0, 2, N'Motorbike under 50cc', N'0cee572c-0a54-4274-8861-52a1146d7844', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-08T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'cscsc', N'', CAST(4.40 AS Decimal(18, 2)), N'cscsc', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (38, 10, 2, N'', N'cscsc', N'ccsc', 2, 0, 2, N'Motorbike under 50cc', N'78769361-5269-4c79-9e5b-4c31a66cbb46', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-08T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'dvdvdv', N'', CAST(4.40 AS Decimal(18, 2)), N'cdvd', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (39, 10, 2, N'', N'hgggug', N'nnnnnn', 2, 0, 2, N'Motorbike under 50cc', N'58bc6c5f-e865-4bb7-8e7e-6ff335973cf7', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-08T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'jjhjhjhjh', N'', CAST(4.40 AS Decimal(18, 2)), N'mhjj', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (40, 10, 2, N'', N'cdcd', N'cdcdccdcdc', 2, 0, 2, N'Motorbike under 50cc', N'fe65bbc0-d532-4a9f-865e-275e45c77c4f', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'cdcdcd', N'', CAST(2.20 AS Decimal(18, 2)), N'cdcdcdccdcdc', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (41, 10, 2, N'', N'cscsc', N'xsxsxcsc', 2, 0, 2, N'Motorbike under 50cc', N'19d52119-790c-4910-b99c-3e49f25646b1', N'', CAST(N'2023-12-29T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-29T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'scsc', N'', CAST(2.20 AS Decimal(18, 2)), N'cscs', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (42, 10, 2, N'', N'cxcx', N'cxxcx', 2, 0, 2, N'Motorbike under 50cc', N'45b4daf3-8d01-46ca-8778-2c8720f88564', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'xcxcx', N'', CAST(2.20 AS Decimal(18, 2)), N'xcxc', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (43, 10, 2, N'', N'vfvfvf', N'vfvf', 2, 0, 2, N'Motorbike under 50cc', N'16008193-909c-4aae-8285-f008113a8144', N'', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-14T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'vfvfvf', N'', CAST(4.40 AS Decimal(18, 2)), N'vfvfv', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (44, 10, 2, N'', N'bvb', N'vbv', 2, 0, 2, N'Motorbike under 50cc', N'205f325d-a16d-4835-a3ed-a55e0cc7227c', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'vbv', N'', CAST(2.20 AS Decimal(18, 2)), N'bvb', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (45, 10, 2, N'', N'vfv', N'vfv', 4, 4, 4, N'Motorbike over 50cc', N'3007f404-c148-45e9-b098-134a9fc154f4', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'vfvfv', N'', CAST(4.40 AS Decimal(18, 2)), N'fvfv', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (46, 10, 2, N'', N'sxs', N'sxsx', 2, 0, 2, N'Motorbike under 50cc', N'3e64a89f-6542-4a5f-9d48-62738174e07b', N'', CAST(N'2023-12-19T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-19T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'sxsx', N'', CAST(4.40 AS Decimal(18, 2)), N'sxsx', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (47, 10, 2, N'', N'xcx', N'xcxc', 2, 0, 2, N'Motorbike under 50cc', N'bf109553-0359-4072-8891-37ee3a9b1fe0', N'', CAST(N'2023-12-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'cxc', N'', CAST(2.20 AS Decimal(18, 2)), N'cxcx', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (48, 10, 2, N'aaaaaaaa', N'fvf', N'ccc', 2, 0, 2, N'Motorbike under 50cc', N'c8e71922-f3f2-4049-bf4e-4cd23932f20f', N'', CAST(N'2023-12-19T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'fvfv', N'', CAST(2.20 AS Decimal(18, 2)), N'173/15/2a kvfv', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (49, 10, 2, N'', N'cxcxc', N'ccxc', 2, 0, 2, N'Motorbike under 50cc', N'0d892b7e-849c-433e-ba3a-f6968e4b1df7', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-12T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'cxcxc', N'', CAST(4.40 AS Decimal(18, 2)), N'cxcxc', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (50, 10, 2, N'', N'xzxz', N'xxxzx', 2, 0, 2, N'Motorbike under 50cc', N'7ee3401d-ddc4-4e32-95ae-0b10e5f72b86', N'', CAST(N'2023-12-11T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-11T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'xzxz', N'', CAST(2.20 AS Decimal(18, 2)), N'xzxz', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (51, 10, 2, N'dcd', N'czcz', N'cdcd', 2, 0, 2, N'Motorbike under 50cc', N'9ade57ac-f95b-41a4-9b64-6b9ca7c1ac4f', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'zczc', N'', CAST(2.20 AS Decimal(18, 2)), N'czc', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (52, 10, 2, N'aaaaaaaa', N'bbbbbbbb', N'ccccccccc', 2, 0, 2, N'Motorbike under 50cc', N'e12d535d-f473-4243-9702-acf8e4785185', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'cdcdc', N'', CAST(2.20 AS Decimal(18, 2)), N'dcdcd', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (53, 10, 2, N'', N'sxsxsx', N'xsxsx', 2, 0, 2, N'Motorbike under 50cc', N'50d0de29-5a0a-44c3-9cde-69eee6a10a84', N'', CAST(N'2023-12-27T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'xsxsx', N'', CAST(2.20 AS Decimal(18, 2)), N'xsxs', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (54, 10, 2, N'aaaaaaaa', N'bbbbbbbb', N'ccccccccc', 2, 0, 2, N'Motorbike under 50cc', N'0d8c2fec-aec1-40a1-9acb-117d130c91c4', N'', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-14T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'cdcdc', N'', CAST(2.20 AS Decimal(18, 2)), N'cdcd', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (55, 10, 2, N'aaaaaaaa', N'xsxsxs', N'xsxsxs', 2, 0, 2, N'Motorbike under 50cc', N'10482964-4193-4f6e-803a-40591abe6668', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'scscscs', N'', CAST(2.20 AS Decimal(18, 2)), N'cscsc', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (56, 10, 2, N'gbbgb', N'bgbgb', N'gbg', 2, 0, 2, N'Motorbike under 50cc', N'5ae17f71-b258-4420-9802-6744f9a07ff8', N'', CAST(N'2023-12-09T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-09T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'bgbgb', N'', CAST(2.20 AS Decimal(18, 2)), N'bgbgbg', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (57, 10, 2, N'vs', N'scd', N'ccs', 2, 0, 2, N'Motorbike under 50cc', N'5824ac85-5d10-4925-8f3d-d75c5b1328fa', N'', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-14T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'cdcdcd', N'', CAST(2.20 AS Decimal(18, 2)), N'cdcd', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (58, 10, 2, N'', N'cvcvcv', N'cvcv', 2, 0, 2, N'Motorbike under 50cc', N'296d4407-47a1-408c-ac95-e79c17240fdf', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'cvcvc', N'', CAST(2.20 AS Decimal(18, 2)), N'cvcv', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (59, 10, 2, N'', N'dcdcd', N'cdcd', 2, 0, 2, N'Motorbike under 50cc', N'e2b69b36-21c4-4553-b55a-722c545eec84', N'', CAST(N'2023-12-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-08T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'cdcdc', N'', CAST(2.20 AS Decimal(18, 2)), N'cdcd', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (60, 10, 3, N'', N'xsxsxs', N'xsxsxsx', 4, 0, 23, N'Car Insurance', N'd67b2f1a-c0a0-4bc3-9e67-31a2f287f5b3', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 4200, N'sxsxs', N'', CAST(25.30 AS Decimal(18, 2)), N'173/15/2a khsxsxs', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (61, 10, 3, N'', N'dccdcd', N'cdcdcd', 2, 0, 2, N'Motorbike under 50cc', N'bb3a6910-f32e-446f-88c4-ff0c2763b651', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'ccdcdc', N'', CAST(2.20 AS Decimal(18, 2)), N'cdcdcd', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (62, 10, 3, N'', N'test', N'test', 2, 0, 2, N'Motorbike under 50cc', N'cf98ef7d-bdc5-4f7c-b40f-40c42f6ecf69', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test', N'', CAST(2.20 AS Decimal(18, 2)), N'test', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (63, 10, 3, N'', N'test2', N'test2', 2, 0, 2, N'Motorbike under 50cc', N'8bf495a6-cf1c-4bda-beb5-ec3072688f30', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test2', N'', CAST(2.20 AS Decimal(18, 2)), N'test2', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (64, 10, 3, N'', N'test3', N'test3', 2, 0, 2, N'Motorbike under 50cc', N'8150e3d7-ac7a-448e-af2b-f9c757df7016', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test3', N'', CAST(2.20 AS Decimal(18, 2)), N'test3', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (65, 10, 3, N'', N'test4', N'test4', 2, 0, 2, N'Motorbike under 50cc', N'c4200e32-ff48-44de-b92f-10598fa2c833', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test4', N'', CAST(2.20 AS Decimal(18, 2)), N'test4', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (66, 10, 3, N'', N'test5', N'test5', 2, 0, 2, N'Motorbike under 50cc', N'06f64a8b-8a67-4006-9761-66859ec1160c', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test5', N'', CAST(2.20 AS Decimal(18, 2)), N'test5', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (67, 10, 3, N'', N'test6', N'test6', 2, 0, 2, N'Motorbike under 50cc', N'ef6b9663-6269-461b-877d-0c895f3b7b61', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test6', N'', CAST(2.20 AS Decimal(18, 2)), N'test6', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (68, 10, 3, N'', N'test7', N'test7', 2, 0, 2, N'Motorbike under 50cc', N'4c4f7fae-7bb7-4fd2-a1ad-a719f31e5d3a', N'', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-14T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test7', N'', CAST(2.20 AS Decimal(18, 2)), N'173/15/2a test7', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (69, 10, 3, N'', N'BONBOB', N'BONBOB', 2, 0, 2, N'Motorbike under 50cc', N'e23dca8a-c79e-450f-9087-047f059eefd3', N'', CAST(N'2023-12-12T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-12T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'BONBOB', N'', CAST(2.20 AS Decimal(18, 2)), N'BONBOB', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (70, 10, 3, N'', N'test8', N'test8', 2, 0, 2, N'Motorbike under 50cc', N'4b293ce8-8b2a-463c-82fb-69faa2b37f8f', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test8', N'', CAST(2.20 AS Decimal(18, 2)), N'test8', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (71, 10, 3, N'', N'test9', N'test9', 2, 0, 2, N'Motorbike under 50cc', N'baed4d59-4e60-4cc2-b205-47ba1b6a5a26', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'test9', N'', CAST(2.20 AS Decimal(18, 2)), N'test9', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (72, 10, 3, N'', N'phat', N'phat', 2, 0, 2, N'Motorbike under 50cc', N'8b787298-fdf4-427f-9aa3-3f0c5e3aba40', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'phat', N'', CAST(2.20 AS Decimal(18, 2)), N'phat', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (73, 10, 3, N'', N'BONBOB', N'BONBOB', 2, 0, 2, N'Motorbike under 50cc', N'b33a1ca8-e67c-47b4-8588-4566151aff45', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'BONBOB', N'', CAST(2.20 AS Decimal(18, 2)), N'BONBOB', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (74, 10, 3, N'', N'ccc', N'ccc', 2, 0, 2, N'Motorbike under 50cc', N'bbd15f12-ff93-4085-8333-ea254aefd88a', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'ccc', N'', CAST(2.20 AS Decimal(18, 2)), N'ccc', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (75, 10, 3, N'', N'xsxsx', N'xsxsx', 2, 0, 2, N'Motorbike under 50cc', N'938c262c-1403-47ff-b9b3-93ec583b1fb9', N'', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'xsxsx', N'', CAST(2.20 AS Decimal(18, 2)), N'xsxsx', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (76, 10, 3, N'', N'cdcdc', N'cdcd', 2, 0, 2, N'Motorbike under 50cc', N'65c74ed5-18b7-4d23-b41b-0220759f2e32', N'', CAST(N'2023-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2025-12-14T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'cdcd', N'', CAST(4.40 AS Decimal(18, 2)), N'dcdc', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (77, 10, 3, N'', N'dvsgb', N'cdcdcdc', 2, 0, 2, N'Motorbike under 50cc', N'c8bc9874-7712-4fa1-971c-9dacb4a63b00', N'', CAST(N'2023-12-19T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'eeeeeeeeeeee', N'', CAST(2.20 AS Decimal(18, 2)), N'cdcdcdcd', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (78, 10, 3, N'51AMG586', N'056JJW', N'MDHG554', 2, 0, 2, N'Motorbike under 50cc', N'8bc3e33c-25ca-41b4-b29d-53ebf61c5464', N'123456789812', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'Truong Tan Phat', N'0706727271', CAST(2.20 AS Decimal(18, 2)), N'173/15/2a khuong viet', N'12345678914522')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (79, 10, 3, N'BONBOB', N'BONBOB', N'BONBOB', 2, 0, 2, N'Motorbike under 50cc', N'7b15d737-753a-4242-b8a3-42e949dc7cc8', N'123456789812', CAST(N'2023-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'BONBOB', N'0706727271', CAST(2.20 AS Decimal(18, 2)), N'173/15/2a khucsdcd', N'12345678914522')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (80, 10, 6, N'', N'mhv gjkv', N'jkhbjhvbjh', 2, 0, 2, N'Motorbike under 50cc', N'bd29ee3e-4f0b-4118-931b-8ceec450a7f3', N'123456789812', CAST(N'2023-12-15T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-15T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'dcdcd', N'0706727271', CAST(2.20 AS Decimal(18, 2)), N'173/15/2a khuvfvfvf', N'12345678914522')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (1079, 10, 6, N'', N'thdh', N'sgrgs', 4, 0, 23, N'Car Insurance', N'6329bd1d-6d5c-4988-b855-4823b8d5e810', N'', CAST(N'2023-12-23T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), 1, 6200, 4200, N'srgsrgsrg', N'', CAST(24.84 AS Decimal(18, 2)), N'sgrshr', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (1080, 10, 6, N'', N'IYG4346', N'MIEB74', 2, 0, 2, N'Motorbike under 50cc', N'ed01cae4-46e9-48f7-8401-1906dfe770a4', N'', CAST(N'2023-12-31T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-31T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'Truong Tan Phat', N'', CAST(2.12 AS Decimal(18, 2)), N'173/15/2a khuong viet', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (1081, 10, 2, N'', N'KHDI765', N'542JGF', 4, 0, 23, N'Car Insurance', N'67b0687b-f087-400f-8b15-61f7a595a699', N'', CAST(N'2024-02-02T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-02T00:00:00.0000000' AS DateTime2), 1, 6200, 4200, N'eeeeeeeeeeee', N'', CAST(23.46 AS Decimal(18, 2)), N'rfbtdhbdrtgh', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (1082, 10, 2, N'', N'gdthdth', N'hfdthdfh', 2, 0, 2, N'Motorbike under 50cc', N'6afe1a4d-4335-4c6e-8eea-2f990c2ee521', N'', CAST(N'2024-02-05T00:00:00.0000000' AS DateTime2), CAST(N'2026-02-05T00:00:00.0000000' AS DateTime2), 2, 6200, 2100, N'svdfvsdvs', N'', CAST(4.08 AS Decimal(18, 2)), N'173/15/2a khufvsvs', N'')
INSERT [dbo].[Orders] ([Id], [Vat], [Cus_Id], [LicensePlates], [ChassisNumber], [EngineNumber], [Number_Of_Seats], [Payload], [Price], [Type_Insurance], [Code_Order], [CMND], [DateFrom], [DateTo], [Duration], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Name_Of_Vehicle_Owner], [Phone], [Total], [Vehicle_Owner_Address], [Vehicle_Owner_Tax_Code]) VALUES (1083, 10, 6, N'YGWDJ', N'HGW7645', N'MBE524', 2, 0, 12, N'3 wheel motorbike', N'c83df714-d771-49e8-b69c-84660f7c38f6', N'123456789812', CAST(N'2023-12-25T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), 1, 6200, 2100, N'Truong Tan Phat', N'0706727271', CAST(12.72 AS Decimal(18, 2)), N'173/15/2a Khuong Viet', N'12345678914522')
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([Id_Product], [Contract_Name], [Id_Type_Insurance], [VAT], [Limited_Years], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Reason], [Damages], [Price], [Number_Of_Seats], [Payload]) VALUES (26, N'Motorbike under 50cc', 21, 10, 2, 6200, 2100, N'Avoid being fined by traffic police for not having motorbike insurance.

Financial compensation for physical damage while participating in traffic for people sitting on motorbikes (including the vehicle owner and the person sitting behind the vehicle).

Limit the situation where people who cause accidents run away due to fear of having to pay compensation.', 30, 2, 2, 0)
INSERT [dbo].[Products] ([Id_Product], [Contract_Name], [Id_Type_Insurance], [VAT], [Limited_Years], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Reason], [Damages], [Price], [Number_Of_Seats], [Payload]) VALUES (31, N'6 to 11 seater cars', 20, 10, 3, 7000, 2500, N'Prevent and limit further losses.
Compensate for damage costs and bring the vehicle to the nearest repair location.
Expertise the damage.
NO DEPRECIATION benefit when parts are lost.
The guaranteed payment benefit is when the vehicle is taken to the garage for repair.
Water damage insurance benefits.', 30, 25, 6, 0)
INSERT [dbo].[Products] ([Id_Product], [Contract_Name], [Id_Type_Insurance], [VAT], [Limited_Years], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Reason], [Damages], [Price], [Number_Of_Seats], [Payload]) VALUES (36, N'Cars under 6 seats', 20, 10, 3, 7000, 2500, N'Driving without insurance is considered illegal, buying auto insurance is a way to protect yourself financially when unfortunate risks occur that you cannot foresee. In addition, the insurance company will compensate for damages as specified in the auto insurance contract.', 30, 25, 5, 0)
INSERT [dbo].[Products] ([Id_Product], [Contract_Name], [Id_Type_Insurance], [VAT], [Limited_Years], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Reason], [Damages], [Price], [Number_Of_Seats], [Payload]) VALUES (37, N'Motorbike over 50cc', 21, 10, 2, 6200, 2100, N'Avoid being fined by traffic police for not having motorbike insurance.

Financial compensation for physical damage while participating in traffic for people sitting on motorbikes (including the vehicle owner and the person sitting behind the vehicle).

Limit the situation where people who cause accidents run away due to fear of having to pay compensation.', 30, 4, 2, 4)
INSERT [dbo].[Products] ([Id_Product], [Contract_Name], [Id_Type_Insurance], [VAT], [Limited_Years], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Reason], [Damages], [Price], [Number_Of_Seats], [Payload]) VALUES (38, N'3 wheel motorbike', 21, 10, 2, 6200, 2100, N'Avoid being fined by traffic police for not having motorbike insurance.

Financial compensation for physical damage while participating in traffic for people sitting on motorbikes (including the vehicle owner and the person sitting behind the vehicle).

Limit the situation where people who cause accidents run away due to fear of having to pay compensation.', 30, 12, 2, 0)
INSERT [dbo].[Products] ([Id_Product], [Contract_Name], [Id_Type_Insurance], [VAT], [Limited_Years], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Reason], [Damages], [Price], [Number_Of_Seats], [Payload]) VALUES (39, N'Electric motorbike', 21, 10, 2, 6200, 2100, N'Avoid being fined by traffic police for not having motorbike insurance.

Financial compensation for physical damage while participating in traffic for people sitting on motorbikes (including the vehicle owner and the person sitting behind the vehicle).

Limit the situation where people who cause accidents run away due to fear of having to pay compensation.', 30, 3, 2, 0)
INSERT [dbo].[Products] ([Id_Product], [Contract_Name], [Id_Type_Insurance], [VAT], [Limited_Years], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Reason], [Damages], [Price], [Number_Of_Seats], [Payload]) VALUES (1046, N'MiniVan', 20, 10, 3, 7000, 2500, N'Driving without insurance is considered illegal, buying auto insurance is a way to protect yourself financially when unfortunate risks occur that you cannot foresee. In addition, the insurance company will compensate for damages as specified in the auto insurance contract.', 30, 20, 2, 0)
INSERT [dbo].[Products] ([Id_Product], [Contract_Name], [Id_Type_Insurance], [VAT], [Limited_Years], [Level_Responsibility_For_People], [Level_Responsibility_For_The_Property], [Reason], [Damages], [Price], [Number_Of_Seats], [Payload]) VALUES (1047, N'Car with over 24 seats', 20, 10, 3, 7200, 2500, N'Driving without insurance is considered illegal, buying auto insurance is a way to protect yourself financially when unfortunate risks occur that you cannot foresee. In addition, the insurance company will compensate for damages as specified in the auto insurance contract.', 30, 120, 25, 0)
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
SET IDENTITY_INSERT [dbo].[Type_Insurances] ON 

INSERT [dbo].[Type_Insurances] ([Id_Type_Insurance], [Type], [Description], [Title]) VALUES (20, N'Compulsory Car Insurance', N'- Insurance liability level for health and life damage caused by motor vehicles is: 150,000,000 VND/person/accident.
- The level of insurance liability for property damage caused by cars according to the provisions of the Road Traffic Law is: 100,000,000 VND/accident.
- Compensate for non-contractual damages to health, life, property, to third parties caused by motor vehicles, and damage to the health and lives of passengers caused by motor vehicles.
   For more detailed benefits, please contact AAA Insurance Hotline (1900545435)', N'Nowadays, cars have become a popular means of transportation, serving the needs of traveling more conveniently and easily. Participating in Car Owners Civil Liability Insurance helps you compensate the victim if an incident leads to damage to people and property, thereby allowing you to travel with peace of mind on all roads. This is also the responsibility and obligation of the vehicle owner when participating in traffic.')
INSERT [dbo].[Type_Insurances] ([Id_Type_Insurance], [Type], [Description], [Title]) VALUES (21, N'Compulsory Motorbike Insurance', N'- Insurance liability level for health and life damage caused by motor vehicles is: 150,000,000 VND/person/accident.
- Insurance liability level for property damage caused by two-wheeled motorbikes, three-wheeled motorbikes, mopeds (including electric motorbikes) and vehicles with similar structures according to the provisions of the Law Road traffic is: 50,000,000 VND/accident
- Compensate for non-contractual damages to health, life, property, to third parties caused by motor vehicles, and for damages to the health and lives of passengers caused by motor vehicles.
  For more detailed benefits, please contact AAA Insurance Hotline (1900545435).', N'Life always has potential unforeseen risks. When participating in Compulsory Motorcycle Civil Liability Insurance, AAA Insurance will help you compensate the victim if you unfortunately encounter an incident that leads to damage to people and property, thereby allowing you to travel with peace of mind on all roads.')
SET IDENTITY_INSERT [dbo].[Type_Insurances] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (1, N'string', N'davidphuc91@gmail.com', N'$2a$11$2HKwRxIsbcmg6LORUtlEOu1X9oB/OA5pHgW4VJgPNAWjsqSZR.E/u', N'stringstringstringst', N'6364424381', N'User', 0, NULL, NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (2, N'phucyeuem', N'davidphuc91@gmail.com', N'$2a$11$XVOcAB4OwU09IHekyuoi6.3eNTf2Bj6eljEwNk0sQALI3Az/OCqsO', N'17 315 2a khuông việt', N'0812100035', N'User', 2, NULL, NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (3, N'Truong Tan Phat', N'truongtanphat190703@gmail.com', N'$2a$11$ic93rjuddowYA4a9S/PP0.hIRScPdJkXjWc.K0TCYHGC6cZ/4ZGZ.', N'173/15/2a khuong viet', N'0961188956', N'User', 2, NULL, NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (4, N'phucyeuems', N'truongtanphat190703@gmail.com', N'$2a$11$SQlFzMSjj.uRaeGKI61jUu1WmLa6aGbZFmwvS5kklpTffeUksDMDe', N'ccccccccccccccccccccc', N'0961188956', N'User', 0, NULL, NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (5, N'phucyeuems', N'truongtanphat190703@gmail.com', N'$2a$11$n87EW9zRlDyZUv5DumzA7ONxZHP8RHwjgjCjin3s6uziZ/VySVB7q', N'ccccccccccccccccccccc', N'0961188956', N'User', 2, NULL, NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (6, N'phat', N'truongtanphat190703@gmail.com', N'$2a$11$9UXZuNMnSqV./D0dKcQ.0O9Ry5ZikTy1l5e03c9rWlHluhG0XpY86', N'scscscscscscscsscscsc', N'0961188956', N'User', 2, NULL, NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (7, N'bobu', N'truongtanphat190703@gmail.com', N'$2a$11$K33zSmJd/Va77kO3.6Ktdufy9rOGJOs.W.wVQMLojgfwoNuWNm/2q', N'sxsxsxsxsxsxsxsxsxsxsx', N'0961188956', N'User', 2, CAST(N'2023-12-16T16:31:10.2090000' AS DateTime2), NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (8, N'phan', N'truongtanphat190703@gmail.com', N'$2a$11$yuozs348z5EccEtnCHTsfO/xXhZZb0sC1H83gPgpfj5bEM8NAvnqe', N'phannnnnnnnnnnnnnnnnnnnn', N'0961188956', N'User', 0, CAST(N'2023-12-19T16:32:22.9610000' AS DateTime2), NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (9, N'phan', N'truongtanphat190703@gmail.com', N'$2a$11$Ng00HwPzBEUAXAY.6tHC9.NkeaD2I3i1RAy2ZbY0/yztzsYrjnmlO', N'phannnnnnnnnnnnnnnnnnnnn', N'0961188956', N'User', 2, CAST(N'2023-12-19T16:32:25.0610000' AS DateTime2), NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (1010, N'Phat', N'truongtanphat190703@gmail.com', N'$2a$11$qdVTfTc11huhSZ/Qwa0UkeBH71cFk34yfbG9qymeYOkaYkRCFQ3MO', N'2647 Pham The Hien P7 Q8', N'0812100035', N'User', 0, NULL, N'X14YVkEukZqW5s20OXey2GT8ysZsMlXJ9WKSa8oApIprVh4mFMaixPMt2T0JV3CHE94bB6vLDepH7BL3s3aORLOT19XSxIFTuWPs')
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (1011, N'Phat1', N'truongtanphat190703@gmail.com', N'$2a$11$8nNquhGvIW4mtO7.dxnTA.JSdm3Di5gdg6Q64UsViiN7AJLXyCN1K', N'173/15/2a khuông việt', N'0961188956', N'User', 2, NULL, N'eREev2w7wd3Mn1xEryy61vZHVwwUrTUanMyPxtoKvMcqFC3Kvr3BgJaZhoRLctVGcZ61vZgpBfbtdYrYcNAop8gvxjRmRsACxj9H')
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (2010, N'be bo', N'ggg@gmail.com', N'$2a$11$2dKlscmik.FlxwEs38rM..fYrZKN73pMiExgoLNCa.auZPuMZMAuW', N'173/15/2a khuong viet p phu trung q tan phu tphcm', N'0961188958', N'User', 0, NULL, N'FrCsiR0SKklSIRxaJ2Vxwdq5zigIvOo9K0CuejJdHFYuQlMSMHebZQd0m0oBUMybw8OPEk5HCGtbTDYlb9kaFCfaTtMhf3LYAmlG')
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (2011, N'Truong Tan Phat', N'dav@gmail.com', N'$2a$11$Bpq7j9kr1sAWxxBs.63f7.CfN5dauf4bytDnQjtgggGkpYSJH/Fo6', N'173/15/2a khuong vietaaaaaaa', N'0961188956', N'Emp', 2, NULL, NULL)
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (2018, N'phanphan', N'Phanphan9a4@gmail.com', N'$2a$11$v5rrxxX5kgZXJ3Mcqxb9ouEIXfrLGkeSaKlM6B03l5/.amOk1eaEa', N'173/15/2a khuPhanphan9a4 cdcd', N'0961188956', N'User', 2, CAST(N'2023-12-26T16:14:30.3840000' AS DateTime2), N'5ITy3H9qUh4H1U1ZPzdZqjtSSSYkTbWq1ttQJvZHjLFb2nRoHuUgjOf5YZBoBY1wG09LrTqXeM487g3QR3ezfU0XjxSNE3TsEt8O')
INSERT [dbo].[Users] ([Cus_Id], [Cus_Name], [Cus_Email], [Cus_Password], [Cus_ADD], [Cus_Phone], [Role], [Status], [CreateAt], [Code]) VALUES (2019, N'Admin', N'Admin@example.com', N'$2a$11$aicBCCBVsOJcIbKPIrZ1nuvQ2U4OdN3GEKO1BDCx80JRy.i4cwlLW', N'stringstringstringst', N'7612545576', N'Admin', 2, CAST(N'2023-12-27T07:37:33.4680000' AS DateTime2), NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[VehicleErrors] ON 

INSERT [dbo].[VehicleErrors] ([Id], [ClaimNumber], [ErrorOfVehicle], [Price]) VALUES (1, N'POL5080', N'Khung Xe ($100) , Đèn và Hệ Thống Điện ($50), Bánh Xe và Lốp ($500), Hệ Thống Nhiên Liệu ($550), Đồng Hồ Đo Tốc Độ và Đồng Hồ Đo Xăng ($300)', CAST(1500.00 AS Decimal(18, 2)))
INSERT [dbo].[VehicleErrors] ([Id], [ClaimNumber], [ErrorOfVehicle], [Price]) VALUES (2, N'POL23390', N'Đèn và Hệ Thống Điện ($50), Hệ Thống Phanh ($200), Bánh Xe và Lốp ($500), Hệ Thống Nhiên Liệu ($550)', CAST(1300.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[VehicleErrors] OFF
GO
/****** Object:  Index [IX_ForgetPass_Cus_Id]    Script Date: 12/27/2023 3:03:54 PM ******/
CREATE NONCLUSTERED INDEX [IX_ForgetPass_Cus_Id] ON [dbo].[ForgetPass]
(
	[Cus_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ClaimDetails] ADD  DEFAULT ((0.0)) FOR [BankAccountNumber]
GO
ALTER TABLE [dbo].[ClaimDetails] ADD  DEFAULT (N'') FOR [NameOfBank]
GO
ALTER TABLE [dbo].[OrderDTOs] ADD  DEFAULT (N'') FOR [Code_Order]
GO
ALTER TABLE [dbo].[OrderDTOs] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [DateFrom]
GO
ALTER TABLE [dbo].[OrderDTOs] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [DateTo]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [Number_Of_Seats]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [Payload]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [Price]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (N'') FOR [Code_Order]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [DateFrom]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [DateTo]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [Duration]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [Level_Responsibility_For_People]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [Level_Responsibility_For_The_Property]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (N'') FOR [Name_Of_Vehicle_Owner]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0.0)) FOR [Total]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (N'') FOR [Vehicle_Owner_Address]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [Price]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [Number_Of_Seats]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [Payload]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [Status]
GO
ALTER TABLE [dbo].[ForgetPass]  WITH CHECK ADD  CONSTRAINT [FK_ForgetPass_Users_Cus_Id] FOREIGN KEY([Cus_Id])
REFERENCES [dbo].[Users] ([Cus_Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ForgetPass] CHECK CONSTRAINT [FK_ForgetPass_Users_Cus_Id]
GO
USE [master]
GO
ALTER DATABASE [DemoProject3] SET  READ_WRITE 
GO
