--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 11.3

-- Started on 2019-10-13 09:20:37

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
-- TOC entry 2891 (class 1262 OID 16384)
-- Name: pigpiggo; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE pigpiggo WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE pigpiggo OWNER TO postgres;

\connect pigpiggo

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
-- TOC entry 8 (class 2615 OID 16385)
-- Name: video; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA video;


ALTER SCHEMA video OWNER TO postgres;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 198 (class 1259 OID 16394)
-- Name: caption; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caption (
    video_id text NOT NULL,
    text text,
    "time" integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.caption OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 24576)
-- Name: caption_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.caption_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.caption_id_seq OWNER TO postgres;

--
-- TOC entry 2892 (class 0 OID 0)
-- Dependencies: 199
-- Name: caption_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caption_id_seq OWNED BY public.caption.id;


--
-- TOC entry 197 (class 1259 OID 16386)
-- Name: video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video (
    id text NOT NULL,
    title text NOT NULL,
    length integer NOT NULL,
    thumbnail text NOT NULL,
    uploaded date NOT NULL
);


ALTER TABLE public.video OWNER TO postgres;

--
-- TOC entry 2757 (class 2604 OID 24578)
-- Name: caption id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caption ALTER COLUMN id SET DEFAULT nextval('public.caption_id_seq'::regclass);


ALTER TABLE ONLY public.caption
    ADD CONSTRAINT caption_pkey PRIMARY KEY (id);


--
-- TOC entry 2759 (class 2606 OID 16393)
-- Name: video video_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_pkey PRIMARY KEY (id);


--
-- Name: text_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX text_index ON public.caption USING gin (text public.gin_trgm_ops);


--
-- Name: caption video_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caption
    ADD CONSTRAINT video_fkey FOREIGN KEY (video_id) REFERENCES public.video(id);
-- Completed on 2019-10-13 09:20:38


--
-- PostgreSQL database dump complete
--

