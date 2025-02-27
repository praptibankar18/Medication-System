PGDMP                      |            medication_system    16.0    16.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17742    medication_system    DATABASE     �   CREATE DATABASE medication_system WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 !   DROP DATABASE medication_system;
                postgres    false            �            1259    17743    medications    TABLE     &  CREATE TABLE public.medications (
    medication_id integer NOT NULL,
    patient_id integer NOT NULL,
    medication_name character varying(255) NOT NULL,
    dosage character varying(255),
    frequency character varying(255),
    instructions text,
    start_date date,
    end_date date
);
    DROP TABLE public.medications;
       public         heap    postgres    false            �            1259    17748    medications_medication_id_seq    SEQUENCE     �   CREATE SEQUENCE public.medications_medication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.medications_medication_id_seq;
       public          postgres    false    215                       0    0    medications_medication_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.medications_medication_id_seq OWNED BY public.medications.medication_id;
          public          postgres    false    216            �            1259    17749    patients    TABLE     a  CREATE TABLE public.patients (
    patient_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    date_of_birth date,
    gender character(1),
    phone_number character varying(20),
    email character varying(255),
    address text,
    city character varying(100),
    state character varying(100),
    zipcode character varying(20),
    country character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    practitioner_id integer
);
    DROP TABLE public.patients;
       public         heap    postgres    false            �            1259    17756    patients_patient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patients_patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.patients_patient_id_seq;
       public          postgres    false    217                       0    0    patients_patient_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.patients_patient_id_seq OWNED BY public.patients.patient_id;
          public          postgres    false    218            �            1259    17757    practitioners    TABLE       CREATE TABLE public.practitioners (
    practitioner_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    specialization character varying(100),
    license_number character varying(50),
    phone character varying(20),
    address character varying(255),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    postal_code character varying(20),
    bio text
);
 !   DROP TABLE public.practitioners;
       public         heap    postgres    false            �            1259    17762    practioners_practioner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.practioners_practioner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.practioners_practioner_id_seq;
       public          postgres    false    219                       0    0    practioners_practioner_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.practioners_practioner_id_seq OWNED BY public.practitioners.practitioner_id;
          public          postgres    false    220            Z           2604    17763    medications medication_id    DEFAULT     �   ALTER TABLE ONLY public.medications ALTER COLUMN medication_id SET DEFAULT nextval('public.medications_medication_id_seq'::regclass);
 H   ALTER TABLE public.medications ALTER COLUMN medication_id DROP DEFAULT;
       public          postgres    false    216    215            [           2604    17764    patients patient_id    DEFAULT     z   ALTER TABLE ONLY public.patients ALTER COLUMN patient_id SET DEFAULT nextval('public.patients_patient_id_seq'::regclass);
 B   ALTER TABLE public.patients ALTER COLUMN patient_id DROP DEFAULT;
       public          postgres    false    218    217            ^           2604    17765    practitioners practitioner_id    DEFAULT     �   ALTER TABLE ONLY public.practitioners ALTER COLUMN practitioner_id SET DEFAULT nextval('public.practioners_practioner_id_seq'::regclass);
 L   ALTER TABLE public.practitioners ALTER COLUMN practitioner_id DROP DEFAULT;
       public          postgres    false    220    219            �          0    17743    medications 
   TABLE DATA           �   COPY public.medications (medication_id, patient_id, medication_name, dosage, frequency, instructions, start_date, end_date) FROM stdin;
    public          postgres    false    215   �&       �          0    17749    patients 
   TABLE DATA           �   COPY public.patients (patient_id, first_name, last_name, date_of_birth, gender, phone_number, email, address, city, state, zipcode, country, created_at, updated_at, practitioner_id) FROM stdin;
    public          postgres    false    217   )       �          0    17757    practitioners 
   TABLE DATA           �   COPY public.practitioners (practitioner_id, name, email, password, specialization, license_number, phone, address, city, state, country, postal_code, bio) FROM stdin;
    public          postgres    false    219   ,                  0    0    medications_medication_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.medications_medication_id_seq', 31, true);
          public          postgres    false    216            	           0    0    patients_patient_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.patients_patient_id_seq', 11, true);
          public          postgres    false    218            
           0    0    practioners_practioner_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.practioners_practioner_id_seq', 13, true);
          public          postgres    false    220            `           2606    17767    medications medications_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.medications
    ADD CONSTRAINT medications_pkey PRIMARY KEY (medication_id);
 F   ALTER TABLE ONLY public.medications DROP CONSTRAINT medications_pkey;
       public            postgres    false    215            b           2606    17769    patients patients_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (patient_id);
 @   ALTER TABLE ONLY public.patients DROP CONSTRAINT patients_pkey;
       public            postgres    false    217            d           2606    17771 #   practitioners practioners_email_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.practitioners
    ADD CONSTRAINT practioners_email_key UNIQUE (email);
 M   ALTER TABLE ONLY public.practitioners DROP CONSTRAINT practioners_email_key;
       public            postgres    false    219            f           2606    17773    practitioners practioners_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.practitioners
    ADD CONSTRAINT practioners_pkey PRIMARY KEY (practitioner_id);
 H   ALTER TABLE ONLY public.practitioners DROP CONSTRAINT practioners_pkey;
       public            postgres    false    219            g           2606    17799 !   medications fk_medication_patient    FK CONSTRAINT     �   ALTER TABLE ONLY public.medications
    ADD CONSTRAINT fk_medication_patient FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.medications DROP CONSTRAINT fk_medication_patient;
       public          postgres    false    4706    217    215            h           2606    17779 '   medications medications_patient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.medications
    ADD CONSTRAINT medications_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.medications DROP CONSTRAINT medications_patient_id_fkey;
       public          postgres    false    217    4706    215            i           2606    17794 &   patients patients_practitioner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_practitioner_id_fkey FOREIGN KEY (practitioner_id) REFERENCES public.practitioners(practitioner_id);
 P   ALTER TABLE ONLY public.patients DROP CONSTRAINT patients_practitioner_id_fkey;
       public          postgres    false    219    4710    217            �     x����n�0���S�:؎���`� �Z��v�E��X�$���{�Qm�-K��ɂe� ��#�rX�^9e!�2��;�A�H�GX���
�h�(����ʫ�z>V|��L�Vye�wJ����XEY:��Uv+�m�1�S�S(a��%g��*][�P�Z�CJ��
���'2�VyNJQc���L3��=�nt�]Y|4ls*E��h�0
��M�Ҝ��J���u\֊�
����'�p;h��mBhװ���g ��m='+,b�|��!:�tF
?rud|J�n��`������m�Ȃx��"c�>�Z�h����$םC�n�A�S��e=�Z�|���э���&t�lGJ(b�0���,�3C���.�����S���֫�EPy�#Ҝbuv�.�c9}m�����!ZDD�j�UC[�:
&��O«�ET�0�H�AnvI�"���FϞP=;�a�4�<𼽬���_^7P����*OqG���S�9�,��x�2F�y�����E�X�7����˱('��L&�����      �   �  x���˒�<�����X%ɺfń�K
��?l�4�*��K��L���e;��B�SV�������&��.���<�.����:��fF��H��(z�b}�۵5(m�gU��<��>�&]�PVU�uy��+�oo@r�2�2�S�WJ��`Z/��R�æ�*x�M�6�ie&d�5lF���POJv7)����-~I�C� �ahO�4�P�n"6$䗈�Jpf����J�(xV��7Xwqi�˸�r>{*��r��}��'��n�f�mW>x�a�'&�j�_0=�'s/��T��iѕ��iQ�XV��F��������рݣ��F��r��+�����ڴ�̀e3r�CDv��sɸuN^����M��a��@��=F�e�g�l�Rj��JV��k.E�4�;�apW����j���5�i�`��/�>�Lb�����_����^G-F�=G���<؏J6����&]�ݮ8w���������y5gVX//$�d����X��w��,X�fs)��`�(c�([��g��ކ>t��W��=5R���>�\�)5�	^`�+1�gBd���cbv-ԓ�F႖(�9x�v��1�v�=�Mi��|"�k�;�56=��"9�c�"g���!+��c�=9�XV#ත�P���X.�l�ރ^���b�T.8�ٓ?9L��J��p�ke��V�����H=����P�|�TΛO'9�g�_��/�Oqb��Z����M�q?�J"�Ē$����      �     x���[s��ǟ'�bV�y٢ �ޖW4F1���2�a03 �Oz�,sq�:{�1�����Ϳ���	ω >��|.#�����<�I�$<Ts��0v?�ʏ�'_;�I�Oz�5��|v�N�7���ִ��ɘ������>1�Ź�Hь��Ă9�Fլ�V�Q���R��+����O�'�Cq�r4�B*cS���Q̈́_�3�	>�g`�cy���7�=�8>���\����,��T�A�>��Y�
��^D!���\p�(�|L�(�ҡܡ�]5�`��� �C�(�#M��59^�L�5���0��J3B��F{�)a����T�����HP��EA�]�w�u�dF�
d��xB ~ ��	��[E�]�弿՜Ss�30c:���q�=;�+b�ؑČ�X�T=˧D�%A�l�q��R�3�����#'&Uך��o�:�q��퍇��h%3�j˲ݮ�y԰�љo:�v<Lfd�l�}ͤ]ԣ"$q���h�*�4�R�V+����!�ǂ����h&�6�b��+�|���sZ�,
 o�:R_I��a�0�&�Ŝ���|s�	H�Y���EZ�� �;�˭t�mݧų=�'�7G���k��f���r�.�iI�{)}3�-b?R}]�D\�R��,��Z�I�����S"Hp��Z��Vx����W",���{G��04��#�����8M�h��D:I�hL>��i)�lO����o襸��ŝ[��ً6��&�P�F�}�nﵗ�F����,x�Z�,Y¨��)�^�:�w2��}e�ZN�\l��*�V�7����$JxL�@~jMŰy�m
�v�lm����ߘY
���#UWМ�R���#��,|X���f��-d���oM;t����ñWI�r�ޤ�!������ט�o7b���sAS��Q.p�Rѓ5^���%�]iJ?�|e�WD�NoT�w$/��~��s��t�T��-��%�lv���;�a%�k�AE$�T�Pif����A�|����w��vW�Co���y���U2�ύ�e�"c}7#���>	��T.���Jd�Ä��z ���/���Z��~o�y���JU���Kv��^��d������]_�C!��"�9�[��ݺ��ܺ\���=�����N�u��r�U'��`���Θ4C}lHc�]h)>��_��e�)�W�J��[��6���\a�?}%�q"`�ĉ�;=?d�@� �n@��,��BU��f���������Jʂ.���j�{�[Vo�[X�����������܍H��M�p+��TS�caY�H���'��Xv!/�!�ǉ���0������ ʧ�	��_���u(���Bd��ŋ�`l�>͓A�
��/ֹg���i�ۅ>�6�A�<]�-d	��-d�RƎ���T���!bȂߜ��&�Xy.'�s��+h�X��GRF�o&Lj�C��t̢�^�'�^���x�+��:����I·��b��έ�qS�Z��F}emF��c��ޗ��ux�g}g ד�ғ(u�)�t�Ȭꕊ���yr����Q�{]���h�l_��.nY��-�];H�b�l�Z�V����o��2,�`��v)�j6�(���Y�]E5�\V��f��L.6oSE�m�^��.�O�Rw!u����=�(X�:?�<Xщ902)�7	�ک^-F�P��=0؄���>�Z.U���n/Ƴ'/\o�c�������]���p[~xFc�y1�'cԃB��`�1�y/�g0��,����E]��@�^�?4N�,�����������S��     