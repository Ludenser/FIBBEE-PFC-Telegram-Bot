--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Debian 14.6-1.pgdg110+1)
-- Dumped by pg_dump version 15.0

-- Started on 2022-12-12 21:26:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: authpguser
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO authpguser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16386)
-- Name: users; Type: TABLE; Schema: public; Owner: authpguser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    tg_username character varying(255),
    clickup_user_id integer,
    clickup_username character varying(255),
    clickup_token character varying(255),
    "isOverskilled" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO authpguser;

--
-- TOC entry 209 (class 1259 OID 16385)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: authpguser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO authpguser;

--
-- TOC entry 3323 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: authpguser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3167 (class 2604 OID 16389)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: authpguser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3316 (class 0 OID 16386)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: authpguser
--

COPY public.users (id, tg_username, clickup_user_id, clickup_username, clickup_token, "isOverskilled", "createdAt", "updatedAt") FROM stdin;
1	Сергей Веденеев	6725668	Sergei Vedeneev	6725668_f0a34623a3b3f6d2b133fb0f7636405bdd575bb4	1	2022-09-15 10:08:01.352+00	2022-09-15 10:08:01.352+00
2	Denis Paltsev	10895013	Denis Paltcev	10895013_854bc82f36bad693891ad62c52aa3029659f92af	1	2022-09-16 17:42:03.749+00	2022-09-16 17:42:03.749+00
3	Дмитрий undefined	6725669	Dmitry Shorin	6725669_11944b0305489b2213e448004ceb8ae13647ce66	1	2022-09-14 16:25:05.315+00	2022-09-14 16:25:05.315+00
4	Бот Тестов	42518397	Бот Тестов	42518397_cc4c91e642f3c3c4fa19fe6d9c0d74b29c9ce2ea	0	2022-09-14 14:43:03.707+00	2022-09-14 14:43:03.707+00
5	Валерий Валевко	36390864	Valeriy Valevko	36390864_a883a5631d86dc4130bdff8eeb4fa95609c91945	1	2022-09-14 14:46:32.792+00	2022-09-14 14:46:32.792+00
\.


--
-- TOC entry 3324 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: authpguser
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3169 (class 2606 OID 16397)
-- Name: users users_clickup_user_id_key; Type: CONSTRAINT; Schema: public; Owner: authpguser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_clickup_user_id_key UNIQUE (clickup_user_id);


--
-- TOC entry 3171 (class 2606 OID 16399)
-- Name: users users_clickup_username_key; Type: CONSTRAINT; Schema: public; Owner: authpguser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_clickup_username_key UNIQUE (clickup_username);


--
-- TOC entry 3173 (class 2606 OID 16393)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: authpguser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3175 (class 2606 OID 16395)
-- Name: users users_tg_username_key; Type: CONSTRAINT; Schema: public; Owner: authpguser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tg_username_key UNIQUE (tg_username);


--
-- TOC entry 3322 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: authpguser
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2022-12-12 21:26:41

--
-- PostgreSQL database dump complete
--

