-- Information is taken from https://www.vic.lt/gpsas-apskaita/gar-klasifikatoriai/
-- It says that information was updated on 2020-03-03; data had been added on 2021-01-16


-- SPECIES

INSERT INTO species_translation
(species, language, translation) VALUES
('1', 'lt', 'Šuo'),
('2', 'lt', 'Katė'),
('3', 'lt', 'Šeškas'),
('4', 'lt', 'Triušis'),
('8', 'lt', 'Šinšila'),
('10', 'lt', 'Paukštis'),
('11', 'lt', 'Jūrų kiaulytė'),
('13', 'lt', 'Roplys'),
('14', 'lt', 'Vėžlys');

-- SPECIES CATEGORY

INSERT INTO breed_category
(id, species) VALUES
(1, '2'),
(2, '2'),
(3, '2'),
(4, '2'),
(5, '2'),
(18, '2'),
(7, '1'),
(15, '1'),
(16, '1'),
(13, '1'),
(17, '1'),
(12, '1'),
(8, '1'),
(14, '1'),
(11, '1'),
(10, '1'),
(9, '1');

INSERT INTO breed_category_translation
(breed_category, language, translation) VALUES
(1, 'lt', 'FIFe I kategorijos veislė'),
(2, 'lt', 'FIFe II kategorijos veislė'),
(3, 'lt', 'FIFe III kategorijos veislė'),
(4, 'lt', 'FIFe IV kategorijos veislė'),
(5, 'lt', 'FIFe nepatvirtinta veislė'),
(18, 'lt', 'Nenurodyta (katės)'),
(7, 'lt', 'Aviganiai'),
(15, 'lt', 'Kompanionai ir šunys žaisliukai'),
(16, 'lt', 'Kurtai'),
(13, 'lt', 'Medžiokliniai šunys'),
(17, 'lt', 'Nenurodyta (šunys)'),
(12, 'lt', 'Pėdsekiai'),
(8, 'lt', 'Pinčeriai, šnauceriai, molosai ir kt.'),
(14, 'lt', 'Retriveriai, spanieliai ir kt.'),
(11, 'lt', 'Špicai ir primityvieji šunys'),
(10, 'lt', 'Taksai'),
(9, 'lt', 'Terjerai');

-- BREED

INSERT INTO breed
(id, species, abbreviation) VALUES
(426, '11', 'NJK'),
(448, '10', 'PA'),
(449, '10', 'PC'),
(425, '10', 'NP'),
(450, '10', 'PG'),
(428, '13', 'GEK'),
(427, '13', 'IGU'),
(422, '3', 'ŠN'),
(424, '8', 'NŠ'),
(444, '4', 'LI'),
(423, '4', 'NT'),
(447, '4', 'MR'),
(445, '4', 'HL'),
(446, '4', 'ND'),
(429, '14', 'SAU'),
(12, '1', 'AP'),
(8, '1', 'AH'),
(167, '1', 'HO'),
(97, '1', 'CWT'),
(176, '1', 'IRS'),
(177, '1', 'IS'),
(178, '1', 'IT'),
(182, '1', 'IWS'),
(181, '1', 'IWH'),
(10, '1', 'AK'),
(11, '1', 'AM'),
(6, '1', 'ADB'),
(158, '1', 'GJD'),
(2, '1', 'AB'),
(3, '1', 'AC'),
(346, '1', 'PIT'),
(309, '1', 'AHT'),
(18, '1', 'AST'),
(312, '1', 'TFT'),
(20, '1', 'AVS'),
(17, '1', 'ASD'),
(13, '1', 'APM'),
(136, '1', 'EB'),
(7, '1', 'AF'),
(92, '1', 'CS'),
(139, '1', 'EP'),
(140, '1', 'ES'),
(142, '1', 'ESS'),
(143, '1', 'ET'),
(267, '1', 'RPG'),
(14, '1', 'APS'),
(5, '1', 'AD'),
(15, '1', 'ARB'),
(25, '1', 'BAN'),
(160, '1', 'GR'),
(16, '1', 'AS'),
(4, '1', 'ACD'),
(284, '1', 'SIT'),
(19, '1', 'AT'),
(22, '1', 'AZP'),
(21, '1', 'AZ'),
(26, '1', 'BAR'),
(34, '1', 'BEC'),
(24, '1', 'BA'),
(39, '1', 'BH'),
(38, '1', 'BG'),
(62, '1', 'BT'),
(57, '1', 'BSG'),
(58, '1', 'BSL'),
(59, '1', 'BSM'),
(61, '1', 'BST'),
(154, '1', 'GBE'),
(88, '1', 'CPB'),
(276, '1', 'SBH'),
(56, '1', 'BS'),
(40, '1', 'BIG'),
(42, '1', 'BYT'),
(43, '1', 'BL'),
(234, '1', 'OES'),
(47, '1', 'BOL'),
(30, '1', 'BC'),
(55, '1', 'BRT'),
(23, '1', 'B'),
(27, '1', 'BB'),
(48, '1', 'BOT'),
(155, '1', 'GBR'),
(147, '1', 'FB'),
(311, '1', 'TB'),
(33, '1', 'BE'),
(36, '1', 'BFB'),
(37, '1', 'BFG'),
(54, '1', 'BRS'),
(31, '1', 'BDB'),
(153, '1', 'GB'),
(53, '1', 'BRH'),
(46, '1', 'BO'),
(44, '1', 'BM'),
(65, '1', 'BUT'),
(52, '1', 'BRB'),
(45, '1', 'BMS'),
(83, '1', 'CHP'),
(344, '1', 'ZS'),
(98, '1', 'ČF'),
(100, '1', 'ČT'),
(95, '1', 'CSV'),
(73, '1', 'CBR'),
(74, '1', 'CC'),
(82, '1', 'CHL'),
(81, '1', 'CHK'),
(102, '1', 'DA'),
(123, '1', 'DSF'),
(106, '1', 'DDT'),
(68, '1', 'CAD'),
(108, '1', 'DH'),
(101, '1', 'D'),
(107, '1', 'DDV'),
(121, '1', 'DRP'),
(120, '1', 'DR'),
(186, '1', 'JRT'),
(141, '1', 'ESK'),
(144, '1', 'ETS'),
(9, '1', 'AIT'),
(135, '1', 'EA'),
(138, '1', 'EH'),
(145, '1', 'EU'),
(146, '1', 'F'),
(247, '1', 'PH'),
(149, '1', 'FS'),
(32, '1', 'BDF'),
(49, '1', 'BPF'),
(77, '1', 'CCR'),
(28, '1', 'BBG'),
(157, '1', 'GH'),
(165, '1', 'HG'),
(164, '1', 'HB'),
(441, '1', 'HT'),
(163, '1', 'H'),
(175, '1', 'IP'),
(171, '1', 'IBS'),
(170, '1', 'IBC'),
(89, '1', 'CR'),
(133, '1', 'DZL'),
(117, '1', 'DNL'),
(112, '1', 'DKL'),
(174, '1', 'IM'),
(172, '1', 'ICE'),
(173, '1', 'IFH'),
(348, '1', 'SPA'),
(156, '1', 'GE'),
(217, '1', 'ME'),
(180, '1', 'IVS'),
(436, '1', 'ISH'),
(169, '1', 'IB'),
(293, '1', 'SPI'),
(430, '1', 'IH'),
(110, '1', 'DJT'),
(184, '1', 'JC'),
(183, '1', 'J'),
(187, '1', 'JS'),
(188, '1', 'JT'),
(179, '1', 'YT'),
(86, '1', 'COO'),
(79, '1', 'CD'),
(104, '1', 'DC'),
(192, '1', 'KCS'),
(196, '1', 'KLL'),
(190, '1', 'KAA'),
(432, '1', 'CLD'),
(252, '1', 'PPC'),
(197, '1', 'KO'),
(78, '1', 'CCS'),
(193, '1', 'KE'),
(191, '1', 'KBT'),
(96, '1', 'CT'),
(194, '1', 'KEE'),
(75, '1', 'CCD'),
(433, '1', 'KI'),
(84, '1', 'CLS'),
(189, '1', 'K'),
(76, '1', 'CCI'),
(198, '1', 'KOG'),
(91, '1', 'CRS'),
(199, '1', 'KRO'),
(114, '1', 'DKV'),
(200, '1', 'KUV'),
(209, '1', 'LR'),
(202, '1', 'LA'),
(203, '1', 'LH'),
(208, '1', 'LPP'),
(204, '1', 'LHA'),
(212, '1', 'LVS'),
(205, '1', 'LKT'),
(87, '1', 'CP'),
(206, '1', 'LO'),
(159, '1', 'GP'),
(235, '1', 'ON'),
(201, '1', 'L'),
(248, '1', 'PLI'),
(210, '1', 'LS'),
(148, '1', 'FCR'),
(80, '1', 'CDB'),
(216, '1', 'MB'),
(219, '1', 'MT'),
(214, '1', 'MAA'),
(213, '1', 'M'),
(69, '1', 'CAM'),
(223, '1', 'MZG'),
(339, '1', 'XOM'),
(340, '1', 'XOS'),
(341, '1', 'XOV'),
(345, '1', 'MŠ'),
(272, '1', 'S'),
(221, '1', 'MUN'),
(218, '1', 'MO'),
(220, '1', 'MU'),
(231, '1', 'NSR'),
(215, '1', 'MAN'),
(63, '1', 'BUM'),
(343, '1', 'ZP'),
(70, '1', 'CAN'),
(224, '1', 'N'),
(228, '1', 'NOR'),
(230, '1', 'NRT'),
(225, '1', 'NB'),
(227, '1', 'NL'),
(229, '1', 'NPL'),
(232, '1', 'NW'),
(166, '1', 'HHH'),
(195, '1', 'KH'),
(233, '1', 'OB'),
(238, '1', 'PA'),
(256, '1', 'PRT'),
(237, '1', 'P'),
(244, '1', 'PDD'),
(245, '1', 'PDM'),
(255, '1', 'PPV'),
(347, '1', 'PO'),
(239, '1', 'PAB'),
(185, '1', 'JO'),
(240, '1', 'PB'),
(137, '1', 'EBP'),
(119, '1', 'DP'),
(50, '1', 'BPL'),
(51, '1', 'BPT'),
(85, '1', 'CMP'),
(250, '1', 'PM'),
(236, '1', 'OP'),
(251, '1', 'POE'),
(257, '1', 'PS'),
(93, '1', 'CSA'),
(243, '1', 'PCP'),
(242, '1', 'PCM'),
(249, '1', 'PLP'),
(71, '1', 'CAP'),
(261, '1', 'PZ'),
(35, '1', 'BF'),
(258, '1', 'PUL'),
(259, '1', 'PUM'),
(323, '1', 'VEO'),
(325, '1', 'VL'),
(269, '1', 'RS'),
(268, '1', 'RR'),
(271, '1', 'RVŠ'),
(262, '1', 'R'),
(90, '1', 'CRM'),
(265, '1', 'RL'),
(66, '1', 'BZ'),
(99, '1', 'RT'),
(263, '1', 'RCB'),
(264, '1', 'RG'),
(270, '1', 'RUS'),
(320, '1', 'TTI'),
(319, '1', 'TT'),
(275, '1', 'SAL'),
(273, '1', 'SA'),
(290, '1', 'SMB'),
(274, '1', 'SAA'),
(301, '1', 'SUS'),
(299, '1', 'STB'),
(280, '1', 'SH'),
(285, '1', 'SK'),
(283, '1', 'SIH'),
(287, '1', 'SKT'),
(67, '1', 'C'),
(286, '1', 'SKP'),
(289, '1', 'SLO'),
(298, '1', 'STA'),
(277, '1', 'SBT'),
(294, '1', 'SPK'),
(296, '1', 'SSK'),
(288, '1', 'SLK'),
(279, '1', 'SD'),
(303, '1', 'AR'),
(292, '1', 'SP'),
(295, '1', 'SS'),
(297, '1', 'ST'),
(282, '1', 'ŠI'),
(304, '1', 'IK'),
(281, '1', 'SHH'),
(307, '1', 'ŠP'),
(152, '1', 'FTW'),
(134, '1', 'DZR'),
(118, '1', 'DNR'),
(113, '1', 'DKR'),
(161, '1', 'GS'),
(278, '1', 'SCT'),
(241, '1', 'PCL'),
(305, '1', 'ŠL'),
(302, '1', 'SV'),
(306, '1', 'LK'),
(29, '1', 'BBS'),
(162, '1', 'GSS'),
(308, '1', 'T'),
(318, '1', 'TRD'),
(310, '1', 'TAZ'),
(316, '1', 'TM'),
(314, '1', 'TIS'),
(315, '1', 'TIT'),
(72, '1', 'CAT'),
(317, '1', 'TO'),
(151, '1', 'FTS'),
(94, '1', 'CSM'),
(132, '1', 'DZK'),
(116, '1', 'DNK'),
(111, '1', 'DKK'),
(321, '1', 'TUB'),
(322, '1', 'US'),
(342, '1', 'ZL'),
(331, '1', 'WHT'),
(333, '1', 'WKK'),
(334, '1', 'WKP'),
(337, '1', 'WSS'),
(338, '1', 'WT'),
(130, '1', 'DVB'),
(131, '1', 'DVG'),
(222, '1', 'MVB'),
(335, '1', 'WL'),
(332, '1', 'WK'),
(324, '1', 'VK'),
(115, '1', 'DMV'),
(266, '1', 'RMV'),
(442, '1', 'WFT'),
(291, '1', 'SO'),
(330, '1', 'W'),
(122, '1', 'DS'),
(126, '1', 'DSL'),
(103, '1', 'DB'),
(124, '1', 'DSG'),
(105, '1', 'DD'),
(125, '1', 'DSK'),
(129, '1', 'DSZ'),
(336, '1', 'WS'),
(127, '1', 'DSM'),
(128, '1', 'DSP'),
(326, '1', 'VO'),
(360, '2', 'ABY'),
(389, '2', 'ABL'),
(351, '2', 'ACS/ACL'),
(392, '2', 'AMW'),
(391, '2', 'AMS'),
(390, '2', 'ABS'),
(393, '2', 'AUM'),
(383, '2', 'BAL'),
(434, '2', 'BMB'),
(361, '2', 'BEN'),
(356, '2', 'SBI'),
(396, '2', 'BRX'),
(394, '2', 'BOL'),
(395, '2', 'BOS'),
(421, '2', 'BLH'),
(363, '2', 'BRI'),
(362, '2', 'BML'),
(364, '2', 'BUR'),
(397, '2', 'CEY'),
(399, '2', 'CYM'),
(367, '2', 'DRX'),
(368, '2', 'DSP'),
(443, '2', 'DLF'),
(376, '2', 'MAU'),
(349, '2', 'EXO'),
(431, '2', 'ELF'),
(369, '2', 'EUR'),
(384, '2', 'OLH'),
(371, '2', 'JBT'),
(398, '2', 'CLS'),
(420, '2', 'CAS'),
(365, '2', 'CHA'),
(374, '2', 'KOR'),
(366, '2', 'CRX'),
(372, '2', 'KBL'),
(373, '2', 'KBS'),
(400, '2', 'LPL'),
(401, '2', 'LPS'),
(437, '2', 'MUC'),
(375, '2', 'MAN'),
(352, '2', 'MCO'),
(435, '2', 'MB'),
(416, '2', 'MK'),
(440, '2', 'MNL'),
(439, '2', 'MNT'),
(353, '2', 'NEM'),
(402, '2', 'NEB'),
(354, '2', 'NFO'),
(377, '2', 'OCI'),
(350, '2', 'PER'),
(405, '2', 'PEB'),
(403, '2', 'PBL'),
(404, '2', 'PBS'),
(355, '2', 'RAG'),
(378, '2', 'RUS'),
(419, '2', 'SAV'),
(387, '2', 'SYL'),
(388, '2', 'SYS'),
(409, '2', 'SRL'),
(410, '2', 'SRS'),
(382, '2', 'SPH'),
(386, '2', 'SIA'),
(357, '2', 'SIB'),
(408, '2', 'SIN'),
(379, '2', 'SNO'),
(380, '2', 'SOK'),
(381, '2', 'SOM'),
(411, '2', 'STE'),
(406, '2', 'SFL'),
(407, '2', 'SFS'),
(417, '2', 'SST'),
(412, '2', 'THA'),
(413, '2', 'TIF'),
(451, '2', 'TOY'),
(438, '2', 'TG'),
(414, '2', 'TOL'),
(415, '2', 'TOS'),
(385, '2', 'OSH'),
(358, '2', 'TUA'),
(359, '2', 'TUV'),
(418, '2', 'UL'),
(370, '2', 'GRX'),
-- Faking (adding 999 in the front of the id) mixed breeds of other animals
(9993, '3', 'MŠEŠ'),
(9994, '4', 'MT'),
(9998, '8', 'MŠIN'),
(99910, '10', 'MP'),
(99911, '11', 'MJ'),
(99913, '13', 'MR'),
(99914, '14', 'MV'),
-- Faking (adding 888 in the front of the id) unspecified breeds of animals
(8881, '1', 'UŠ'),
(8882, '2', 'UK'),
(8883, '3', 'UŠEŠ'),
(8884, '4', 'UT'),
(8888, '8', 'UŠIN'),
(88810, '10', 'UP'),
(88811, '11', 'UJ'),
(88813, '13', 'UR'),
(88814, '14', 'UV');

INSERT INTO breed_translation
(breed, language, translation) VALUES
(426, 'lt', 'Naminės jūrų kiaulytės'),
(448, 'lt', 'Aros (papūgos)'),
(449, 'lt', 'Kakadu (papūgos)'),
(425, 'lt', 'Naminiai paukščiai'),
(450, 'lt', 'Pilkosios papūgos (Žako)'),
(428, 'lt', 'Gekonai'),
(427, 'lt', 'Iguanos'),
(422, 'lt', 'Naminiai šeškai'),
(424, 'lt', 'Naminės šinšilos'),
(444, 'lt', 'Liūtagalviai'),
(423, 'lt', 'Naminiai triušiai'),
(447, 'lt', 'Nykštukiniai reksai'),
(445, 'lt', 'Nulėpausiai'),
(446, 'lt', 'Olandijos nykštukai'),
(429, 'lt', 'Sausumos'),
(12, 'lt', 'Afenpinčeriai'),
(8, 'lt', 'Afganų kurtai'),
(167, 'lt', 'Ainių špicai'),
(97, 'lt', 'Airių kviečiaspalviai švelniaplaukiai terjerai'),
(176, 'lt', 'Airių raudadėmiai seteriai'),
(177, 'lt', 'Airių seteriai'),
(178, 'lt', 'Airių terjerai'),
(182, 'lt', 'Airių vandens spanieliai'),
(181, 'lt', 'Airių volfhaundai'),
(10, 'lt', 'Akitos'),
(11, 'lt', 'Aliaskos malamutai'),
(6, 'lt', 'Alpių daksbrakai'),
(158, 'lt', 'Amerikiečių akitos'),
(2, 'lt', 'Amerikiečių buldogai'),
(3, 'lt', 'Amerikiečių kokerspanieliai'),
(346, 'lt', 'Amerikiečių pitbulterjerai'),
(309, 'lt', 'Amerikiečių plikieji terjerai'),
(18, 'lt', 'Amerikiečių Stafordšyro terjerai'),
(312, 'lt', 'Amerikiečių toiterjerai'),
(20, 'lt', 'Amerikiečių vandens spanieliai'),
(17, 'lt', 'Anatolijos karabašai'),
(13, 'lt', 'Anglų - prancūzų mažieji skalikai'),
(136, 'lt', 'Anglų buldogai'),
(7, 'lt', 'Anglų fokshaundai'),
(92, 'lt', 'Anglų kokerspanieliai'),
(139, 'lt', 'Anglų pointeriai'),
(140, 'lt', 'Anglų seteriai'),
(142, 'lt', 'Anglų springerspanieliai'),
(143, 'lt', 'Anglų toiterjerai'),
(267, 'lt', 'Anglų-rusų skalikai'),
(14, 'lt', 'Apencelio zenenhundai'),
(5, 'lt', 'Argentiniečių dogai'),
(15, 'lt', 'Arježo brakai'),
(25, 'lt', 'Artua normandų basetai'),
(160, 'lt', 'Auksaspalviai retriveriai'),
(16, 'lt', 'Australų aviganiai'),
(4, 'lt', 'Australų ganymo šunys'),
(284, 'lt', 'Australų šilkiniai terjerai'),
(19, 'lt', 'Australų terjerai'),
(22, 'lt', 'Austrų pinčeriai'),
(21, 'lt', 'Azavakai'),
(26, 'lt', 'Barbetai'),
(34, 'lt', 'Barzdotieji koliai'),
(24, 'lt', 'Basendžiai'),
(39, 'lt', 'Basethaundai'),
(38, 'lt', 'Bavarų pėdsekiai'),
(62, 'lt', 'Bedlingtono terjerai'),
(57, 'lt', 'Belgų aviganiai griunendaliai'),
(58, 'lt', 'Belgų aviganiai lakenua'),
(59, 'lt', 'Belgų aviganiai malinua'),
(61, 'lt', 'Belgų aviganiai terviuerenai'),
(154, 'lt', 'Belgų grifonai'),
(88, 'lt', 'Bergamo aviganiai'),
(276, 'lt', 'Berno skalikai'),
(56, 'lt', 'Berno zenenhundai'),
(40, 'lt', 'Bigliai'),
(42, 'lt', 'Byverio jorkšyro terjerai'),
(43, 'lt', 'Bladhaundai'),
(234, 'lt', 'Bobteilai'),
(47, 'lt', 'Bolonės bišonai'),
(30, 'lt', 'Borderkoliai'),
(55, 'lt', 'Borderterjerai'),
(23, 'lt', 'Bordo dogai'),
(27, 'lt', 'Boseronai'),
(48, 'lt', 'Bostono terjerai'),
(155, 'lt', 'Brabanto grifonai'),
(147, 'lt', 'Brazilų mastifai'),
(311, 'lt', 'Brazilų terjerai'),
(33, 'lt', 'Bretanės epanjoliai'),
(36, 'lt', 'Bretanės rudieji basetai'),
(37, 'lt', 'Bretanės rudieji grifonai'),
(54, 'lt', 'Bretanės spanieliai'),
(31, 'lt', 'Briarai'),
(153, 'lt', 'Briuselio grifonai'),
(53, 'lt', 'Broholmeriai'),
(46, 'lt', 'Bulgarų aviganiai'),
(44, 'lt', 'Bulmastifai'),
(65, 'lt', 'Bulterjerai'),
(52, 'lt', 'Burbonų brakai'),
(45, 'lt', 'Buriatų-mongolų laikos'),
(83, 'lt', 'Chodsko šunys'),
(344, 'lt', 'Cvergšnauceriai'),
(98, 'lt', 'Čekų fousekai'),
(100, 'lt', 'Čekų terjerai'),
(95, 'lt', 'Čekų vilkšuniai'),
(73, 'lt', 'Česapyko retriveriai'),
(74, 'lt', 'Čiau Čiau'),
(82, 'lt', 'Čihuahua ilgaplaukiai'),
(81, 'lt', 'Čihuahua trumpaplaukiai'),
(102, 'lt', 'Dalmatinai'),
(123, 'lt', 'Danų - švedų ūkininkų šunys'),
(106, 'lt', 'Dendžio Dinmonto terjerai'),
(68, 'lt', 'Didieji pudeliai'),
(108, 'lt', 'Dirhaundai'),
(101, 'lt', 'Dobermanai'),
(107, 'lt', 'Dratharai'),
(121, 'lt', 'Drentės kurapkiniai šunys'),
(120, 'lt', 'Dreveriai'),
(186, 'lt', 'Džeko Raselo terjerai'),
(141, 'lt', 'Elniniai skalikai'),
(144, 'lt', 'Entlebucho zenenhundai'),
(9, 'lt', 'Erdelio terjerai'),
(135, 'lt', 'Estrelos aviganiai (ilgaplaukiai)'),
(138, 'lt', 'Estų skalikai'),
(145, 'lt', 'Eurazijos špicai'),
(146, 'lt', 'Falenai'),
(247, 'lt', 'Faraonų šunys'),
(149, 'lt', 'Fyldspanieliai'),
(32, 'lt', 'Flamandų buvjė'),
(49, 'lt', 'Garbanotieji bišonai'),
(77, 'lt', 'Garbanotieji retriveriai'),
(28, 'lt', 'Gaskonės žydrieji basetai'),
(157, 'lt', 'Greihaundai'),
(165, 'lt', 'Hanoverio pėdsekiai'),
(164, 'lt', 'Havanos bišonai'),
(441, 'lt', 'Heidės terjerai'),
(163, 'lt', 'Hovavartai'),
(175, 'lt', 'Ibisos šunys'),
(171, 'lt', 'Ibisos šunys (šiurkščiaplaukiai)'),
(170, 'lt', 'Ibisos šunys (trumpaplaukiai)'),
(89, 'lt', 'Ilgaplaukiai koliai'),
(133, 'lt', 'Ilgaplaukiai nykštukiniai taksai'),
(117, 'lt', 'Ilgaplaukiai taksai'),
(112, 'lt', 'Ilgaplaukiai triušiniai taksai'),
(174, 'lt', 'Imalio slėnio terjerai'),
(172, 'lt', 'Islandų aviganiai'),
(173, 'lt', 'Islandų špicai'),
(348, 'lt', 'Ispanų alano'),
(156, 'lt', 'Ispanų kurtai'),
(217, 'lt', 'Ispanų mastifai'),
(180, 'lt', 'Ispanų vandens šunys'),
(436, 'lt', 'Istrijos trumpaplaukiai skalikai'),
(169, 'lt', 'Italų brakai'),
(293, 'lt', 'Italų spinonai'),
(430, 'lt', 'Italų trumpaplaukis skalikas'),
(110, 'lt', 'Jagdterjerai'),
(184, 'lt', 'Japonų činai'),
(183, 'lt', 'Japonų didieji šunys'),
(187, 'lt', 'Japonų špicai'),
(188, 'lt', 'Japonų terjerai'),
(179, 'lt', 'Jorkšyro terjerai'),
(86, 'lt', 'Juodieji kunhaundai'),
(79, 'lt', 'Kanaano šunys'),
(104, 'lt', 'Kanarų dogai'),
(192, 'lt', 'Karaliaus Karolio spanieliai'),
(196, 'lt', 'Karelų lokinės laikos'),
(190, 'lt', 'Karsto aviganiai'),
(432, 'lt', 'Katahulos leopardinis šuo'),
(252, 'lt', 'Katalonų aviganiai'),
(197, 'lt', 'Kaukazo aviganiai'),
(78, 'lt', 'Kavalieriaus karaliaus Karolio spanieliai'),
(193, 'lt', 'Kelpiai'),
(191, 'lt', 'Keribliūterjerai'),
(96, 'lt', 'Kernterjerai'),
(194, 'lt', 'Keshondai'),
(75, 'lt', 'Kinų kuoduotieji šunys'),
(433, 'lt', 'Kišu'),
(84, 'lt', 'Klamberio spanieliai'),
(189, 'lt', 'Komondorai'),
(76, 'lt', 'Korsikos šunys'),
(198, 'lt', 'Kortalso grifonai'),
(91, 'lt', 'Kroatų aviganiai'),
(199, 'lt', 'Kromforlenderiai'),
(114, 'lt', 'Kurtsharai'),
(200, 'lt', 'Kuvasai'),
(209, 'lt', 'Labradoro retriveriai'),
(202, 'lt', 'Landsyrai'),
(203, 'lt', 'Lankašyro heleriai'),
(208, 'lt', 'Lapių elniaganiai'),
(204, 'lt', 'Lasos apsai'),
(212, 'lt', 'Latvių skalikai'),
(205, 'lt', 'Leiklendo terjerai'),
(87, 'lt', 'Lenkų kurtai'),
(206, 'lt', 'Lenkų ogarai'),
(159, 'lt', 'Lenkų skalikai'),
(235, 'lt', 'Lenkų žemumų aviganiai'),
(201, 'lt', 'Leonbergeriai'),
(248, 'lt', 'Levretės'),
(210, 'lt', 'Lietuvių skalikai'),
(148, 'lt', 'Lygiaplaukiai retriveriai'),
(80, 'lt', 'Maljorkos buldogai'),
(216, 'lt', 'Maltos bišonai'),
(219, 'lt', 'Mančesterio terjerai'),
(214, 'lt', 'Maremano-Abrucio aviganiai'),
(213, 'lt', 'Mastifai'),
(69, 'lt', 'Mažieji pudeliai'),
(223, 'lt', 'Mažieji žydrieji gaskonų skalikai'),
(339, 'lt', 'Meksikiečių plikieji (miniatiūriniai)'),
(340, 'lt', 'Meksikiečių plikieji (standartiniai)'),
(341, 'lt', 'Meksikiečių plikieji (vidutinieji)'),
-- This doc https://www.vic.lt/gpsas-apskaita/gar-klasifikatoriai/ has "Mišrūnai" for mixed breed dogs. Changing it to "Mišrūnai šunys" to make it clearer
(345, 'lt', 'Mišrūnai šunys'),
(272, 'lt', 'Mitelšnauceriai'),
(221, 'lt', 'Miunsterio mažieji paukštšuniai'),
(218, 'lt', 'Mopsai'),
(220, 'lt', 'Mudžiai'),
(231, 'lt', 'Naujosios Škotijos retriveriai'),
(215, 'lt', 'Neapolio mastifai'),
(63, 'lt', 'Nykštukiniai bulterjerai'),
(343, 'lt', 'Nykštukiniai pinčeriai'),
(70, 'lt', 'Nykštukiniai pudeliai'),
(224, 'lt', 'Niūfaundlendai'),
(228, 'lt', 'Norboteno špicai'),
(230, 'lt', 'Norfolko terjerai'),
(225, 'lt', 'Norvegų buhundai'),
(227, 'lt', 'Norvegų lundehundai'),
(229, 'lt', 'Norvegų pilkieji špicai'),
(232, 'lt', 'Norvičo terjerai'),
(166, 'lt', 'Olandų aviganiai'),
(195, 'lt', 'Olandų kokerspanieliai'),
(233, 'lt', 'Overnės brakai'),
(238, 'lt', 'Papiljonai'),
(256, 'lt', 'Pastoriaus Raselo terjerai'),
(237, 'lt', 'Pekinai'),
(244, 'lt', 'Peru plikieji šunys (didieji)'),
(245, 'lt', 'Peru plikieji šunys (mažieji)'),
(255, 'lt', 'Peru plikieji šunys (vidutinieji)'),
(347, 'lt', 'Peterburgo orchidėjos'),
(239, 'lt', 'Pietų Afrikos burbuliai'),
(185, 'lt', 'Pietų Rusijos aviganiai'),
(240, 'lt', 'Pikardijos aviganiai'),
(137, 'lt', 'Pikardijos žydrieji epanjoliai'),
(119, 'lt', 'Pinčeriai'),
(50, 'lt', 'Pirėnų aviganiai (ilgaplaukiai)'),
(51, 'lt', 'Pirėnų aviganiai (trumpaplaukiai)'),
(85, 'lt', 'Pirėnų kalnų šunys'),
(250, 'lt', 'Pirėnų mastifai'),
(236, 'lt', 'Podhalės aviganiai'),
(251, 'lt', 'Pont Odmero epanjoliai'),
(257, 'lt', 'Porcelianiniai skalikai'),
(93, 'lt', 'Portugalų aviganiai'),
(243, 'lt', 'Portugalų podengai (šiurkščiaplaukiai mažieji)'),
(242, 'lt', 'Portugalų podengai (šiurkščiaplaukiai vidutinieji)'),
(249, 'lt', 'Portugalų podengai (trumpaplaukiai mažieji)'),
(71, 'lt', 'Portugalų vandens šunys'),
(261, 'lt', 'Prahos žiurkučiai'),
(35, 'lt', 'Prancūzų buldogai'),
(258, 'lt', 'Puliai'),
(259, 'lt', 'Pumiai'),
(323, 'lt', 'Rytų Europos aviganiai'),
(325, 'lt', 'Rytų Sibiro laikos'),
(269, 'lt', 'Ryzenšnauceriai'),
(268, 'lt', 'Rodezijos ridžbekai'),
(271, 'lt', 'Romanijos vandens šunys'),
(262, 'lt', 'Rotveileriai'),
(90, 'lt', 'Rumunų Mioritijos aviganiai'),
(265, 'lt', 'Rusų europinės laikos'),
(66, 'lt', 'Rusų ilgaplaukiai kurtai'),
(99, 'lt', 'Rusų juodieji terjerai'),
(263, 'lt', 'Rusų margieji bišonai'),
(264, 'lt', 'Rusų skalikai'),
(270, 'lt', 'Rusų spanieliai'),
(320, 'lt', 'Rusų žaisliukai (ilgaplaukiai)'),
(319, 'lt', 'Rusų žaisliukai (trumpaplaukiai)'),
(275, 'lt', 'Saliukiai'),
(273, 'lt', 'Samojedai'),
(290, 'lt', 'San Migelio bandganiai'),
(274, 'lt', 'Sarloso vilkšuniai'),
(301, 'lt', 'Sasekso spanieliai'),
(299, 'lt', 'Senbernarai'),
(280, 'lt', 'Sibiro haskiai'),
(285, 'lt', 'Sicilijos kurtai'),
(283, 'lt', 'Silihemo terjerai'),
(287, 'lt', 'Skajaus terjerai'),
(67, 'lt', 'Slovakų kuvačiai'),
(286, 'lt', 'Slovakų skalikai'),
(289, 'lt', 'Slugiai'),
(298, 'lt', 'Stabihaunai'),
(277, 'lt', 'Stafordšyro bulterjerai'),
(294, 'lt', 'Suomių laikos'),
(296, 'lt', 'Suomių skalikai'),
(288, 'lt', 'Suomių-lapių špicai'),
(279, 'lt', 'Šapendojai'),
(303, 'lt', 'Šar Planinos aviganiai'),
(292, 'lt', 'Šarpėjai'),
(295, 'lt', 'Šelčiai'),
(297, 'lt', 'Ši cu'),
(282, 'lt', 'Šiba inu '),
(304, 'lt', 'Šikoku '),
(281, 'lt', 'Šilerio skalikai'),
(307, 'lt', 'Šiperkai'),
(152, 'lt', 'Šiurkščiaplaukiai foksterjerai'),
(134, 'lt', 'Šiurkščiaplaukiai nykštukiniai taksai'),
(118, 'lt', 'Šiurkščiaplaukiai taksai'),
(113, 'lt', 'Šiurkščiaplaukiai triušiniai taksai'),
(161, 'lt', 'Škotų seteriai'),
(278, 'lt', 'Škotų terjerai'),
(241, 'lt', 'Šunys liūtukai'),
(305, 'lt', 'Švedų laikos'),
(302, 'lt', 'Švedų valhundai'),
(306, 'lt', 'Švedų-lapių špicai'),
(29, 'lt', 'Šveicarų baltieji aviganiai'),
(162, 'lt', 'Šveicarų didieji zenenhundai'),
(308, 'lt', 'Taiganai'),
(318, 'lt', 'Tailando ridžbekai'),
(310, 'lt', 'Tazai'),
(316, 'lt', 'Tibeto mastifai'),
(314, 'lt', 'Tibeto spanieliai'),
(315, 'lt', 'Tibeto terjerai'),
(72, 'lt', 'Toipudeliai'),
(317, 'lt', 'Tosos'),
(151, 'lt', 'Trumpaplaukiai foksterjerai'),
(94, 'lt', 'Trumpaplaukiai koliai'),
(132, 'lt', 'Trumpaplaukiai nykštukiniai taksai'),
(116, 'lt', 'Trumpaplaukiai taksai'),
(111, 'lt', 'Trumpaplaukiai triušiniai taksai'),
(321, 'lt', 'Tulearo bišonai'),
(322, 'lt', 'Ūdriniai skalikai'),
(342, 'lt', 'Vakarų Sibiro laikos'),
(331, 'lt', 'Vakarų Škotijos baltieji terjerai'),
(333, 'lt', 'Valų korgiai kardiganai'),
(334, 'lt', 'Valų korgiai pembrukai'),
(337, 'lt', 'Valų springerspanieliai'),
(338, 'lt', 'Valų terjerai'),
(130, 'lt', 'Vandėjos didieji basetai grifonai'),
(131, 'lt', 'Vandėjos didieji grifonai'),
(222, 'lt', 'Vandėjos mažieji basetai grifonai'),
(335, 'lt', 'Veimaro ilgaplaukiai paukštšuniai'),
(332, 'lt', 'Veimaro trumpaplaukiai paukštšuniai'),
(324, 'lt', 'Vengrų kurtai'),
(115, 'lt', 'Vengrų šiurkščiaplaukiai vižlai'),
(266, 'lt', 'Vengrų trumpaplaukiai vižlai'),
(442, 'lt', 'Vestfalijos terjerai'),
(291, 'lt', 'Vidurinės Azijos aviganiai'),
(330, 'lt', 'Vipetai'),
(122, 'lt', 'Vokiečių aviganiai'),
(126, 'lt', 'Vokiečių aviganiai (ilgaplaukiai)'),
(103, 'lt', 'Vokiečių bokseriai'),
(124, 'lt', 'Vokiečių didieji špicai'),
(105, 'lt', 'Vokiečių dogai'),
(125, 'lt', 'Vokiečių mažieji špicai'),
(129, 'lt', 'Vokiečių nykštukiniai špicai'),
(336, 'lt', 'Vokiečių spanieliai'),
(127, 'lt', 'Vokiečių vidutiniai špicai'),
(128, 'lt', 'Volfšpicai keshondai'),
(326, 'lt', 'Volpinai'),
(360, 'lt', 'Abisinijos katės'),
(389, 'lt', 'Amerikos ilgaplaukiai bobteilai'),
(351, 'lt', 'Amerikos riestaausės'),
(392, 'lt', 'Amerikos šiurkščiaplaukės'),
(391, 'lt', 'Amerikos trumpaplaukės'),
(390, 'lt', 'Amerikos trumpaplaukiai bobteilai'),
(393, 'lt', 'Australijos miglos katė'),
(383, 'lt', 'Balio katės'),
(434, 'lt', 'Bambino katės'),
(361, 'lt', 'Bengalijos katės'),
(356, 'lt', 'Birmos katės'),
(396, 'lt', 'Bohemijos reksai'),
(394, 'lt', 'Bombėjaus ilgaplaukės'),
(395, 'lt', 'Bombėjaus trumpaplaukės'),
(421, 'lt', 'Britų ilgaplaukiai'),
(363, 'lt', 'Britų trumpaplaukės'),
(362, 'lt', 'Burmilos'),
(364, 'lt', 'Burmos katės'),
(397, 'lt', 'Ceilono katės'),
(399, 'lt', 'Cymric katės'),
(367, 'lt', 'Devonreksai'),
(368, 'lt', 'Dono sfinksai'),
(443, 'lt', 'Dvelfai'),
(376, 'lt', 'Egipto Mau katė'),
(349, 'lt', 'Egzotai'),
(431, 'lt', 'Elfas'),
(369, 'lt', 'Europos trumpaplaukės'),
(384, 'lt', 'Ilgaplaukiai orientalai (Rytų ilgaplaukės)'),
(371, 'lt', 'Japonų trumpauodegės'),
(398, 'lt', 'Kalifornijos žvaigždėtosios'),
(420, 'lt', 'Kanados sfinksai'),
(365, 'lt', 'Kartezianinės katės'),
(374, 'lt', 'Koratai'),
(366, 'lt', 'Kornvalio reksai'),
(372, 'lt', 'Kurilų trumpauodegės ilgaplaukės'),
(373, 'lt', 'Kurilų trumpauodegės trumpaplaukės'),
(400, 'lt', 'Lapermo ilgaplaukės'),
(401, 'lt', 'Lapermo trumpaplaukės'),
(437, 'lt', 'Mančkino katės'),
(375, 'lt', 'Manksų katės'),
(352, 'lt', 'Meino meškėnai'),
(435, 'lt', 'Mekongo bobteilai'),
-- This doc https://www.vic.lt/gpsas-apskaita/gar-klasifikatoriai/ has "Mišrūnės" for mixed breed dogs. Changing it to "Mišrūnės katės" to make it clearer
(416, 'lt', 'Mišrūnės katės'),
(440, 'lt', 'Napoleono (Minueto) ilgaplaukės'),
(439, 'lt', 'Napoleono (Minueto) trumpaplaukės'),
(353, 'lt', 'Nevos maskaradinės'),
(402, 'lt', 'Nibelungai'),
(354, 'lt', 'Norvegų miškinės'),
(377, 'lt', 'Oksikatai'),
(350, 'lt', 'Persų katės'),
(405, 'lt', 'Peterburgo sfinksai'),
(403, 'lt', 'Piksibobai (ilgaplaukiai)'),
(404, 'lt', 'Piksibobai (trumpaplaukiai)'),
(355, 'lt', 'Regdolai arba skudurinės lėlės'),
(378, 'lt', 'Rusų melsvosios'),
(419, 'lt', 'Savanos katės'),
(387, 'lt', 'Seišelių ilgaplaukės'),
(388, 'lt', 'Seišelių trumpaplaukės'),
(409, 'lt', 'Selkirkreksai (ilgaplaukiai)'),
(410, 'lt', 'Selkirkreksai (trumpaplaukiai)'),
(382, 'lt', 'Sfinksai'),
(386, 'lt', 'Siamo katės'),
(357, 'lt', 'Sibiro katės'),
(408, 'lt', 'Singapūro katės'),
(379, 'lt', 'Sniego letenėlės'),
(380, 'lt', 'Sokokės'),
(381, 'lt', 'Somalio katės'),
(411, 'lt', 'Sterlingai'),
(406, 'lt', 'Škotų nulėpausiai ilgaplaukiai'),
(407, 'lt', 'Škotų nulėpausiai trumpaplaukiai'),
(417, 'lt', 'Škotų stačiaausiai'),
(412, 'lt', 'Tailando (Thai) katės'),
(413, 'lt', 'Tifanės'),
(451, 'lt', 'Toibobai'),
(438, 'lt', 'Toigeriai'),
(414, 'lt', 'Tonkino ilgaplaukės'),
(415, 'lt', 'Tonkino trumpaplaukės'),
(385, 'lt', 'Trumpaplaukiai orientalai (Rytų trumpaplaukės)'),
(358, 'lt', 'Turkų angoros katės'),
(359, 'lt', 'Turkų vanai'),
(418, 'lt', 'Ukrainos levkojai'),
(370, 'lt', 'Vokiečių reksai'),
-- Faking (adding 999 in the front of the id) mixed breeds of other animals
(9993, 'lt', 'Mišrūnai šeškai'),
(9994, 'lt', 'Mišrūnai triušiai'),
(9998, 'lt', 'Mišrūnės šinšilos'),
(99910, 'lt', 'Mišrūnai paukščiai'),
(99911, 'lt', 'Mišrūnės jūrų kiaulytės'),
(99913, 'lt', 'Mišrūnai ropliai'),
(99914, 'lt', 'Mišrūnai vėžliai'),
-- Faking (adding 888 in the front of the id) unspecified breeds of animals
(8881, 'lt', 'Neįvardintas šuo'),
(8882, 'lt', 'Neįvardinta katė'),
(8883, 'lt', 'Neįvardintas šeškas'),
(8884, 'lt', 'Neįvardintas triušis'),
(8888, 'lt', 'Neįvardinta šinšila'),
(88810, 'lt', 'Neįvardintas Paukštis'),
(88811, 'lt', 'Neįvardinta jūrų kiaulytė'),
(88813, 'lt', 'Neįvardintas roplys'),
(88814, 'lt', 'Neįvardintas vėžlys');

-- GENDER

INSERT INTO gender_translation
(gender, language, translation) VALUES
('1', 'lt', 'Patelė'),
('2', 'lt', 'Patinas'),
('3', 'lt', 'Kastruota patelė'),
('4', 'lt', 'Kastruotas patinas');

-- DISEASE

INSERT INTO disease
(code, species) VALUES
(37, '2'),
(28, '2'),
(43, '2'),
(2, '2'),
(4, '2'),
(49, '2'),
(5, '2'),
(8, '2'),
(9, '2'),
(10, '2'),
(31, '2'),
(26, '2'),
(15, '2'),
(24, '2'),
(19, '2'),
(34, '2'),
(40, '2'),
(46, '2'),
(38, '3'),
(29, '3'),
(44, '3'),
(3, '3'),
(50, '3'),
(52, '3'),
(7, '3'),
(32, '3'),
(12, '3'),
(56, '3'),
(14, '3'),
(22, '3'),
(54, '3'),
(25, '3'),
(17, '3'),
(20, '3'),
(35, '3'),
(41, '3'),
(47, '3'),
(36, '1'),
(27, '1'),
(42, '1'),
(1, '1'),
(48, '1'),
(51, '1'),
(6, '1'),
(30, '1'),
(11, '1'),
(55, '1'),
(13, '1'),
(53, '1'),
(23, '1'),
(16, '1'),
(18, '1'),
(33, '1'),
(39, '1'),
(21, '1'),
(45, '1'),
(58, '4'),
(57, '4');

INSERT INTO disease_translation
(disease, language, translation) VALUES
(37, 'lt', 'Apvaliosios (Nemathelminthes)'),
(28, 'lt', 'Babeziozė'),
(43, 'lt', 'Blusos'),
(2, 'lt', 'Bordateliozė'),
(4, 'lt', 'Chlamidiozė'),
(49, 'lt', 'Erkės'),
(5, 'lt', 'Infekcinis laringotracheitas'),
(8, 'lt', 'Kačių infekcinis rinotracheitas '),
(9, 'lt', 'Kačių leukemija'),
(10, 'lt', 'Kalicivirozė'),
(31, 'lt', 'Kaspinuočiai (Cestoda)'),
(26, 'lt', 'Mikrosporija'),
(15, 'lt', 'Panleukopenija'),
(24, 'lt', 'Paragripas'),
(19, 'lt', 'Pasiutligė'),
(34, 'lt', 'Plokščiosios (Platyhelminthes)'),
(40, 'lt', 'Siurbikės (Trematoda)'),
(46, 'lt', 'Utelės'),
(38, 'lt', 'Apvaliosios (Nemathelminthes)'),
(29, 'lt', 'Babeziozė'),
(44, 'lt', 'Blusos'),
(3, 'lt', 'Bordateliozė'),
(50, 'lt', 'Erkės'),
(52, 'lt', 'Infekcinis laringotracheitas'),
(7, 'lt', 'Infekcinis mesėdžių hepatitas'),
(32, 'lt', 'Kaspinuočiai (Cestoda)'),
(12, 'lt', 'Kvėpavimo takų adenovirusinė liga'),
(56, 'lt', 'Leišmaniozė'),
(14, 'lt', 'Leptospirozė'),
(22, 'lt', 'Maras'),
(54, 'lt', 'Mikrosporija'),
(25, 'lt', 'Paragripas'),
(17, 'lt', 'Parvovirusinis enteritas'),
(20, 'lt', 'Pasiutligė'),
(35, 'lt', 'Plokščiosios (Platyhelminthes)'),
(41, 'lt', 'Siurbikės (Trematoda)'),
(47, 'lt', 'Utelės'),
(36, 'lt', 'Apvaliosios (Nemathelminthes)'),
(27, 'lt', 'Babeziozė'),
(42, 'lt', 'Blusos'),
(1, 'lt', 'Bordateliozė'),
(48, 'lt', 'Erkės'),
(51, 'lt', 'Infekcinis laringotracheitas'),
(6, 'lt', 'Infekcinis mesėdžių hepatitas'),
(30, 'lt', 'Kaspinuočiai (Cestoda)'),
(11, 'lt', 'Kvėpavimo takų adenovirusinė liga'),
(55, 'lt', 'Leišmaniozė'),
(13, 'lt', 'Leptospirozė'),
(53, 'lt', 'Mikrosporija'),
(23, 'lt', 'Paragripas'),
(16, 'lt', 'Parvovirusinis šunų enteritas'),
(18, 'lt', 'Pasiutligė'),
(33, 'lt', 'Plokščiosios (Platyhelminthes)'),
(39, 'lt', 'Siurbikės (Trematoda)'),
(21, 'lt', 'Šunų maras'),
(45, 'lt', 'Utelės'),
(58, 'lt', 'Hemoraginė septicemija'),
(57, 'lt', 'Miksomatozė');

-- COLOR

INSERT INTO color
(code, species) VALUES
(83, '11'),
(84, '11'),
(85, '11'),
(86, '11'),
(87, '11'),
(88, '11'),
(89, '11'),
(90, '11'),
(91, '11'),
(92, '11'),
(93, '11'),
(26, '2'),
(44, '2'),
(42, '2'),
(2, '2'),
(36, '2'),
(24, '2'),
(21, '2'),
(27, '2'),
(43, '2'),
(5, '2'),
(3, '2'),
(22, '2'),
(1, '2'),
(20, '2'),
(37, '2'),
(19, '2'),
(9, '2'),
(16, '2'),
(10, '2'),
(17, '2'),
(40, '2'),
(6, '2'),
(4, '2'),
(23, '2'),
(25, '2'),
(28, '2'),
(29, '2'),
(30, '2'),
(31, '2'),
(32, '2'),
(33, '2'),
(34, '2'),
(35, '2'),
(38, '2'),
(39, '2'),
(41, '2'),
(45, '2'),
(46, '2'),
(47, '2'),
(48, '2'),
(49, '2'),
(50, '2'),
(8, '2'),
(11, '2'),
(12, '2'),
(13, '2'),
(14, '2'),
(15, '2'),
(18, '2'),
(109, '10'),
(117, '10'),
(111, '10'),
(114, '10'),
(116, '10'),
(110, '10'),
(112, '10'),
(115, '10'),
(113, '10'),
(94, '13'),
(95, '13'),
(96, '13'),
(97, '13'),
(98, '13'),
(65, '3'),
(66, '3'),
(67, '3'),
(68, '3'),
(69, '3'),
(70, '3'),
(71, '3'),
(72, '3'),
(79, '8'),
(80, '8'),
(81, '8'),
(82, '8'),
(51, '1'),
(105, '1'),
(52, '1'),
(53, '1'),
(54, '1'),
(55, '1'),
(56, '1'),
(57, '1'),
(108, '1'),
(58, '1'),
(104, '1'),
(107, '1'),
(59, '1'),
(61, '1'),
(60, '1'),
(62, '1'),
(106, '1'),
(63, '1'),
(64, '1'),
(73, '4'),
(74, '4'),
(75, '4'),
(76, '4'),
(77, '4'),
(78, '4'),
(99, '14'),
(100, '14'),
(101, '14'),
(102, '14'),
(103, '14');

INSERT INTO color_translation
(color, language, translation) VALUES
(83, 'lt', 'Balta'),
(84, 'lt', 'Gelsva'),
(85, 'lt', 'Geltona'),
(86, 'lt', 'Juoda'),
(87, 'lt', 'Kreminė'),
(88, 'lt', 'Pilka'),
(89, 'lt', 'Raudona'),
(90, 'lt', 'Ruda'),
(91, 'lt', 'Smėlinė'),
(92, 'lt', 'Šokoladinė'),
(93, 'lt', 'Žila'),
(26, 'lt', 'Mėlyna'),
(44, 'lt', 'Šviesi gintarinė'),
(42, 'lt', 'Šokoladinė'),
(2, 'lt', 'Alyvinė'),
(36, 'lt', 'Raudona'),
(24, 'lt', 'Kreminė'),
(21, 'lt', 'Juoda vėžlio kiauto piešiniu'),
(27, 'lt', 'Mėlyna vėžlio kiauto piešiniu'),
(43, 'lt', 'Šokoladinė vėžlio kiauto piešiniu'),
(5, 'lt', 'Auksinė'),
(3, 'lt', 'Alyvinė vėžlio kiauto piešiniu'),
(22, 'lt', 'Karamelinė'),
(1, 'lt', 'Abrikosinė'),
(20, 'lt', 'Juoda'),
(37, 'lt', 'Rausva'),
(19, 'lt', 'Gintarinė'),
(9, 'lt', 'Cinamoninė'),
(16, 'lt', 'Gelsvai ruda'),
(10, 'lt', 'Cinamoninė vėžlio kiauto piešiniu'),
(17, 'lt', 'Gelsvai ruda vėžlio kiauto piešiniu'),
(40, 'lt', 'Sidabrinė'),
(6, 'lt', 'Balta'),
(4, 'lt', 'Apelsininė'),
(23, 'lt', 'Kavos spalva'),
(25, 'lt', 'Lelijinė'),
(28, 'lt', 'Melsva'),
(29, 'lt', 'Oranžinė'),
(30, 'lt', 'Persikinė'),
(31, 'lt', 'Pieno spalva'),
(32, 'lt', 'Pilka'),
(33, 'lt', 'Platininė'),
(34, 'lt', 'Plieninė'),
(35, 'lt', 'Rauda'),
(38, 'lt', 'Ruda'),
(39, 'lt', 'Rusva'),
(41, 'lt', 'Smėlinė'),
(45, 'lt', 'Varinė'),
(46, 'lt', 'Vėžlio kiauto spalva'),
(47, 'lt', 'Žalia'),
(48, 'lt', 'Žalsva'),
(49, 'lt', 'Žydra'),
(50, 'lt', 'Žila'),
(8, 'lt', 'Bronzinė'),
(11, 'lt', 'Citrininė'),
(12, 'lt', 'Dramblio kaulo'),
(13, 'lt', 'Druska su pipirais spalva'),
(14, 'lt', 'Dūminė'),
(15, 'lt', 'Gelsva'),
(18, 'lt', 'Geltona'),
(109, 'lt', 'Balta'),
(117, 'lt', 'Geltona'),
(111, 'lt', 'Juoda'),
(114, 'lt', 'Mėlyna'),
(116, 'lt', 'Oranžinė'),
(110, 'lt', 'Pilka'),
(112, 'lt', 'Raudona'),
(115, 'lt', 'Violetinė'),
(113, 'lt', 'Žalia'),
(94, 'lt', 'Balta'),
(95, 'lt', 'Mėlyna'),
(96, 'lt', 'Pilka'),
(97, 'lt', 'Ruda'),
(98, 'lt', 'Žalia'),
(65, 'lt', 'Balta'),
(66, 'lt', 'Gelsvai pilka'),
(67, 'lt', 'Gelsvai ruda'),
(68, 'lt', 'Juoda'),
(69, 'lt', 'Kreminė'),
(70, 'lt', 'Pilka'),
(71, 'lt', 'Ruda'),
(72, 'lt', 'Rudai raudona'),
(79, 'lt', 'Balta'),
(80, 'lt', 'Juoda'),
(81, 'lt', 'Pilka'),
(82, 'lt', 'Ruda'),
(51, 'lt', 'Alyvinė'),
(105, 'lt', 'Auksinė'),
(52, 'lt', 'Balta'),
(53, 'lt', 'Gelsvai rusva'),
(54, 'lt', 'Geltona'),
(55, 'lt', 'Juoda'),
(56, 'lt', 'Kreminė'),
(57, 'lt', 'Mėlyna'),
(108, 'lt', 'Oranžinė'),
(58, 'lt', 'Pilka'),
(104, 'lt', 'Plieninė'),
(107, 'lt', 'Rauda'),
(59, 'lt', 'Raudona auksinė'),
(61, 'lt', 'Ruda'),
(60, 'lt', 'Sabalo raudona'),
(62, 'lt', 'Smėlinė'),
(106, 'lt', 'Šerninė'),
(63, 'lt', 'Šokoladinė'),
(64, 'lt', 'Žila'),
(73, 'lt', 'Balta'),
(74, 'lt', 'Gelsva'),
(75, 'lt', 'Juoda'),
(76, 'lt', 'Mėlyna'),
(77, 'lt', 'Pilka'),
(78, 'lt', 'Ruda'),
(99, 'lt', 'Balta'),
(100, 'lt', 'Mėlyna'),
(101, 'lt', 'Pilka'),
(102, 'lt', 'Ruda'),
(103, 'lt', 'Žalia');

-- COLOR PATTERN

INSERT INTO color_pattern
(code, species) VALUES
(68, '11'),
(69, '11'),
(70, '11'),
(01, '2'),
(02, '2'),
(03, '2'),
(04, '2'),
(05, '2'),
(06, '2'),
(09, '2'),
(11, '2'),
(12, '2'),
(21, '2'),
(22, '2'),
(23, '2'),
(24, '2'),
(25, '2'),
(31, '2'),
(32, '2'),
(33, '2'),
(98, '2'),
(99, '2'),
(77, '10'),
(78, '10'),
(79, '10'),
(71, '13'),
(72, '13'),
(73, '13'),
(59, '3'),
(60, '3'),
(61, '3'),
(65, '8'),
(66, '8'),
(67, '8'),
(04, '1'),
(50, '1'),
(51, '1'),
(52, '1'),
(53, '1'),
(54, '1'),
(55, '1'),
(56, '1'),
(57, '1'),
(58, '1'),
(62, '4'),
(63, '4'),
(64, '4'),
(74, '14'),
(75, '14'),
(76, '14');

INSERT INTO color_pattern_translation
(color_pattern, species, language, translation) VALUES
(68, '11', 'lt', 'Jūrų kiaulytė Vienspalvė'),
(69, '11', 'lt', 'Jūrų kiaulytė Dvispalvė'),
(70, '11', 'lt', 'Jūrų kiaulytė Trispalvė'),
(01, '2', 'lt', 'Balta katė su spalvotomis dėmėmis ant galvos ir uodegos'),
(02, '2', 'lt', 'Margaspalvė katė-spalvotos dėmės ant kūno ir letenų sudaro 25-50 proc. kūno paviršiaus'),
(03, '2', 'lt', 'Dvispalvė, balta spalva sudaro 25-50 proc. kūno paviršiaus'),
(04, '2', 'lt', 'Tonuota'),
(05, '2', 'lt', 'Baltos letenėlės, kita spalva kintanti- tamsi,  šokoladinė- iki šviesios cinamoninės'),
(06, '2', 'lt', 'Beplaukė'),
(09, '2', 'lt', 'Neapibrėžtas baltos spalvos kiekis'),
(11, '2', 'lt', 'Šėšeliuota, trečdalis plauko galo spalvotas'),
(12, '2', 'lt', 'Su šydu, aštuntadalis plauko galo spalvotas'),
(21, '2', 'lt', 'Neapibrėžta raina'),
(22, '2', 'lt', 'Dėmėtai raina'),
(23, '2', 'lt', 'Dryžuotai raina'),
(24, '2', 'lt', 'Taškuotai raina'),
(25, '2', 'lt', 'Mažais taškeliais raina'),
(31, '2', 'lt', 'Burmos su brūkšniuotais raštais'),
(32, '2', 'lt', 'Tonkineso su brūkšniuotais raštais'),
(33, '2', 'lt', 'Himalajų su taškuotais raštais'),
(98, '2', 'lt', 'Vienspalvė'),
(99, '2', 'lt', 'Kiti raštai'),
(77, '10', 'lt', 'Vienspalvis'),
(78, '10', 'lt', 'Dvispalvis'),
(79, '10', 'lt', 'Trispalvis'),
(71, '13', 'lt', 'Vienspalvis'),
(72, '13', 'lt', 'Dvispalvis'),
(73, '13', 'lt', 'Trispalvis'),
(59, '3', 'lt', 'Vienspalvis'),
(60, '3', 'lt', 'Dvispalvis'),
(61, '3', 'lt', 'Trispalvis'),
(65, '8', 'lt', 'Vienspalvė'),
(66, '8', 'lt', 'Dvispalvė'),
(67, '8', 'lt', 'Trispalvė'),
(04, '1', 'lt', 'Su juoda kauke'),
(50, '1', 'lt', 'Tigrinis'),
(51, '1', 'lt', 'Vienspalvis'),
(52, '1', 'lt', 'Laukinio atspalviai'),
(53, '1', 'lt', 'Vientisos žymės viršutinėje srityje'),
(54, '1', 'lt', 'Vientisos žymės skirtingose srityse'),
(55, '1', 'lt', 'Marmurinis'),
(56, '1', 'lt', 'Dryžuotas'),
(57, '1', 'lt', 'Taškuotas, keršas'),
(58, '1', 'lt', 'Kiti raštai'),
(62, '4', 'lt', 'Triušis Vienspalvis'),
(63, '4', 'lt', 'Triušis Dvispalvis'),
(64, '4', 'lt', 'Triušis Trispalvis'),
(74, '14', 'lt', 'Vėžlys Vienspalvis'),
(75, '14', 'lt', 'Vėžlys Dvispalvis'),
(76, '14', 'lt', 'Vėžlys Trispalvis');

-- CHIP INSTALL PLACE

INSERT INTO chip_install_place_translation
(install_place_id, language, translation) VALUES
('1', 'lt', 'Tarp menčių'),
('2', 'lt', 'Kairėje kaklo pusėje'),
('3', 'lt', 'Dešinėje kaklo pusėje'),
('4', 'lt', 'Ant kojos');

-- CHIP COMPANY

INSERT INTO chip_company_translation
(chip_company_code, language, translation) VALUES
('1', 'lt', 'Allflex'),
('2', 'lt', 'Avid'),
('3', 'lt', 'Data Mars'),
('4', 'lt', 'Kita'),
('5', 'lt', 'Planet ID'),
('6', 'lt', 'Trovan'),
('7', 'lt', 'Virbac'),
('8', 'lt', 'Nežinomas'),
('9', 'lt', 'Soartech Electronics INC.'),
('10', 'lt', 'ISOBlue'),
('11', 'lt', 'BARTMED'),
('12', 'lt', 'Schippers');

--- STATUS

INSERT INTO status_translation (status, language, translation)
VALUES
('healthy', 'lt', 'Sveikas'),
('vaccinated', 'lt', 'Paskiepytas'),
('sick', 'lt', 'Ligotas'),
('adopted', 'lt', 'Priglaustas'),
('Active', 'lt', 'Aktyvus'),
('Inactive', 'lt', 'Neaktyvus'),
('Implanted', 'lt', 'Implantuotas'),
('Removed', 'lt', 'Išimtas');

--- MUNICIPALITY
INSERT INTO municipality (name)
VALUES
('Akmenės rajono savivaldybė'),
('Alytaus miesto savivaldybė'),
('Alytaus rajono savivaldybė'),
('Anykščių rajono savivaldybė'),
('Birštono savivaldybė'),
('Biržų rajono savivaldybė'),
('Druskininkų savivaldybė'),
('Elektrėnų savivaldybė'),
('Ignalinos rajono savivaldybė'),
('Jonavos rajono savivaldybė'),
('Joniškio rajono savivaldybė'),
('Jurbarko rajono savivaldybė'),
('Kaišiadorių rajono savivaldybė'),
('Kalvarijos savivaldybė'),
('Kauno miesto savivaldybė'),
('Kauno rajono savivaldybė'),
('Kazlų Rūdos savivaldybė'),
('Kėdainių rajono savivaldybė'),
('Kelmės rajono savivaldybė'),
('Klaipėdos miesto savivaldybė'),
('Klaipėdos rajono savivaldybė'),
('Kretingos rajono savivaldybė'),
('Kupiškio rajono savivaldybė'),
('Lazdijų rajono savivaldybė'),
('Marijampolės savivaldybė'),
('Mažeikių rajono savivaldybė'),
('Molėtų rajono savivaldybė'),
('Neringos savivaldybė'),
('Pagėgių savivaldybė'),
('Pakruojo rajono savivaldybė'),
('Palangos miesto savivaldybė'),
('Panevėžio miesto savivaldybė'),
('Panevėžio rajono savivaldybė'),
('Pasvalio rajono savivaldybė'),
('Plungės rajono savivaldybė'),
('Prienų rajono savivaldybė'),
('Radviliškio rajono savivaldybė'),
('Raseinių rajono savivaldybė'),
('Rietavo savivaldybė'),
('Rokiškio rajono savivaldybė'),
('Skuodo rajono savivaldybė'),
('Šakių rajono savivaldybė'),
('Šalčininkų rajono savivaldybė'),
('Šiaulių miesto savivaldybė'),
('Šiaulių rajono savivaldybė'),
('Šilalės rajono savivaldybė'),
('Šilutės rajono savivaldybė'),
('Širvintų rajono savivaldybė'),
('Švenčionių rajono savivaldybė'),
('Tauragės rajono savivaldybė'),
('Telšių rajono savivaldybė'),
('Trakų rajono savivaldybė'),
('Ukmergės rajono savivaldybė'),
('Utenos rajono savivaldybė'),
('Varėnos rajono savivaldybė'),
('Vilkaviškio rajono savivaldybė'),
('Vilniaus miesto savivaldybė'),
('Vilniaus rajono savivaldybė'),
('Visagino savivaldybė'),
('Zarasų rajono savivaldybė');
