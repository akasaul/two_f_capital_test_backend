PGDMP  	        	        	    |            database    16.3 (Debian 16.3-1.pgdg120+1)    16.3 (Debian 16.3-1.pgdg120+1) V    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    database    DATABASE     s   CREATE DATABASE database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE database;
                user    false                        2615    41086    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                user    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   user    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   user    false    5            v           1247    41317    OrderStatus    TYPE     ^   CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'DELIVERED',
    'PREPARING'
);
     DROP TYPE public."OrderStatus";
       public          user    false    5            �            1259    41280    Order    TABLE     \  CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "restaurantId" integer NOT NULL,
    "pizzaId" integer NOT NULL,
    qty integer NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Order";
       public         heap    user    false    886    5    886            �            1259    41279    Order_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Order_id_seq";
       public          user    false    230    5            �           0    0    Order_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;
          public          user    false    229            �            1259    41124 
   Permission    TABLE     �   CREATE TABLE public."Permission" (
    id integer NOT NULL,
    action text NOT NULL,
    subject text NOT NULL,
    name text NOT NULL
);
     DROP TABLE public."Permission";
       public         heap    user    false    5            �            1259    41123    Permission_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Permission_id_seq";
       public          user    false    222    5            �           0    0    Permission_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Permission_id_seq" OWNED BY public."Permission".id;
          public          user    false    221            �            1259    41095    Pizza    TABLE     �   CREATE TABLE public."Pizza" (
    id integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "pizzaCover" text NOT NULL,
    "restaurantId" integer NOT NULL
);
    DROP TABLE public."Pizza";
       public         heap    user    false    5            �            1259    41094    Pizza_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Pizza_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Pizza_id_seq";
       public          user    false    217    5            �           0    0    Pizza_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Pizza_id_seq" OWNED BY public."Pizza".id;
          public          user    false    216            �            1259    41200 
   Restaurant    TABLE     �   CREATE TABLE public."Restaurant" (
    id integer NOT NULL,
    name text NOT NULL,
    "managerId" integer NOT NULL,
    location text NOT NULL,
    logo text NOT NULL,
    "phoneNumber" text NOT NULL
);
     DROP TABLE public."Restaurant";
       public         heap    user    false    5            �            1259    41199    Restaurant_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Restaurant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Restaurant_id_seq";
       public          user    false    5    225            �           0    0    Restaurant_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Restaurant_id_seq" OWNED BY public."Restaurant".id;
          public          user    false    224            �            1259    41115    Role    TABLE     �   CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL,
    "restaurantId" integer,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Role";
       public         heap    user    false    5            �            1259    41114    Role_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Role_id_seq";
       public          user    false    5    220            �           0    0    Role_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;
          public          user    false    219            �            1259    41226    Topping    TABLE     �   CREATE TABLE public."Topping" (
    id integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "restaurantId" integer NOT NULL
);
    DROP TABLE public."Topping";
       public         heap    user    false    5            �            1259    41225    Topping_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Topping_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Topping_id_seq";
       public          user    false    5    227            �           0    0    Topping_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Topping_id_seq" OWNED BY public."Topping".id;
          public          user    false    226            �            1259    41087    User    TABLE       CREATE TABLE public."User" (
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    id integer NOT NULL,
    "roleId" integer NOT NULL,
    "phoneNumber" text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);
    DROP TABLE public."User";
       public         heap    user    false    5            �            1259    41103    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          user    false    5    215            �           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          user    false    218            �            1259    41286    _OrderToppings    TABLE     ]   CREATE TABLE public."_OrderToppings" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);
 $   DROP TABLE public."_OrderToppings";
       public         heap    user    false    5            �            1259    41234    _PizzaToppings    TABLE     ]   CREATE TABLE public."_PizzaToppings" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);
 $   DROP TABLE public."_PizzaToppings";
       public         heap    user    false    5            �            1259    41184    _RolePermissions    TABLE     _   CREATE TABLE public."_RolePermissions" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);
 &   DROP TABLE public."_RolePermissions";
       public         heap    user    false    5            �           2604    41283    Order id    DEFAULT     h   ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);
 9   ALTER TABLE public."Order" ALTER COLUMN id DROP DEFAULT;
       public          user    false    230    229    230            �           2604    41127    Permission id    DEFAULT     r   ALTER TABLE ONLY public."Permission" ALTER COLUMN id SET DEFAULT nextval('public."Permission_id_seq"'::regclass);
 >   ALTER TABLE public."Permission" ALTER COLUMN id DROP DEFAULT;
       public          user    false    222    221    222            �           2604    41098    Pizza id    DEFAULT     h   ALTER TABLE ONLY public."Pizza" ALTER COLUMN id SET DEFAULT nextval('public."Pizza_id_seq"'::regclass);
 9   ALTER TABLE public."Pizza" ALTER COLUMN id DROP DEFAULT;
       public          user    false    217    216    217            �           2604    41203    Restaurant id    DEFAULT     r   ALTER TABLE ONLY public."Restaurant" ALTER COLUMN id SET DEFAULT nextval('public."Restaurant_id_seq"'::regclass);
 >   ALTER TABLE public."Restaurant" ALTER COLUMN id DROP DEFAULT;
       public          user    false    224    225    225            �           2604    41118    Role id    DEFAULT     f   ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);
 8   ALTER TABLE public."Role" ALTER COLUMN id DROP DEFAULT;
       public          user    false    219    220    220            �           2604    41229 
   Topping id    DEFAULT     l   ALTER TABLE ONLY public."Topping" ALTER COLUMN id SET DEFAULT nextval('public."Topping_id_seq"'::regclass);
 ;   ALTER TABLE public."Topping" ALTER COLUMN id DROP DEFAULT;
       public          user    false    226    227    227            �           2604    41104    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          user    false    218    215                      0    41280    Order 
   TABLE DATA           d   COPY public."Order" (id, "userId", "restaurantId", "pizzaId", qty, status, "createdAt") FROM stdin;
    public          user    false    230   Uc       w          0    41124 
   Permission 
   TABLE DATA           A   COPY public."Permission" (id, action, subject, name) FROM stdin;
    public          user    false    222   .d       r          0    41095    Pizza 
   TABLE DATA           P   COPY public."Pizza" (id, name, price, "pizzaCover", "restaurantId") FROM stdin;
    public          user    false    217   !e       z          0    41200 
   Restaurant 
   TABLE DATA           \   COPY public."Restaurant" (id, name, "managerId", location, logo, "phoneNumber") FROM stdin;
    public          user    false    225   �e       u          0    41115    Role 
   TABLE DATA           S   COPY public."Role" (id, name, "restaurantId", "isActive", "createdAt") FROM stdin;
    public          user    false    220   �g       |          0    41226    Topping 
   TABLE DATA           D   COPY public."Topping" (id, name, price, "restaurantId") FROM stdin;
    public          user    false    227   i       p          0    41087    User 
   TABLE DATA           s   COPY public."User" ("firstName", "lastName", email, password, id, "roleId", "phoneNumber", "isActive") FROM stdin;
    public          user    false    215   Ui       �          0    41286    _OrderToppings 
   TABLE DATA           4   COPY public."_OrderToppings" ("A", "B") FROM stdin;
    public          user    false    231   o       }          0    41234    _PizzaToppings 
   TABLE DATA           4   COPY public."_PizzaToppings" ("A", "B") FROM stdin;
    public          user    false    228   go       x          0    41184    _RolePermissions 
   TABLE DATA           6   COPY public."_RolePermissions" ("A", "B") FROM stdin;
    public          user    false    223   �o       �           0    0    Order_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Order_id_seq"', 15, true);
          public          user    false    229            �           0    0    Permission_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Permission_id_seq"', 7, true);
          public          user    false    221            �           0    0    Pizza_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Pizza_id_seq"', 20, true);
          public          user    false    216            �           0    0    Restaurant_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Restaurant_id_seq"', 8, true);
          public          user    false    224            �           0    0    Role_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Role_id_seq"', 48, true);
          public          user    false    219            �           0    0    Topping_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Topping_id_seq"', 5, true);
          public          user    false    226            �           0    0    User_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_id_seq"', 82, true);
          public          user    false    218            �           2606    41285    Order Order_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pkey";
       public            user    false    230            �           2606    41131    Permission Permission_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Permission"
    ADD CONSTRAINT "Permission_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Permission" DROP CONSTRAINT "Permission_pkey";
       public            user    false    222            �           2606    41102    Pizza Pizza_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Pizza"
    ADD CONSTRAINT "Pizza_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Pizza" DROP CONSTRAINT "Pizza_pkey";
       public            user    false    217            �           2606    41207    Restaurant Restaurant_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Restaurant"
    ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Restaurant" DROP CONSTRAINT "Restaurant_pkey";
       public            user    false    225            �           2606    41122    Role Role_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_pkey";
       public            user    false    220            �           2606    41233    Topping Topping_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Topping"
    ADD CONSTRAINT "Topping_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Topping" DROP CONSTRAINT "Topping_pkey";
       public            user    false    227            �           2606    41106    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            user    false    215            �           1259    41218    Restaurant_phoneNumber_key    INDEX     e   CREATE UNIQUE INDEX "Restaurant_phoneNumber_key" ON public."Restaurant" USING btree ("phoneNumber");
 0   DROP INDEX public."Restaurant_phoneNumber_key";
       public            user    false    225            �           1259    41092    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            user    false    215            �           1259    41219    User_phoneNumber_key    INDEX     Y   CREATE UNIQUE INDEX "User_phoneNumber_key" ON public."User" USING btree ("phoneNumber");
 *   DROP INDEX public."User_phoneNumber_key";
       public            user    false    215            �           1259    41289    _OrderToppings_AB_unique    INDEX     b   CREATE UNIQUE INDEX "_OrderToppings_AB_unique" ON public."_OrderToppings" USING btree ("A", "B");
 .   DROP INDEX public."_OrderToppings_AB_unique";
       public            user    false    231    231            �           1259    41290    _OrderToppings_B_index    INDEX     T   CREATE INDEX "_OrderToppings_B_index" ON public."_OrderToppings" USING btree ("B");
 ,   DROP INDEX public."_OrderToppings_B_index";
       public            user    false    231            �           1259    41237    _PizzaToppings_AB_unique    INDEX     b   CREATE UNIQUE INDEX "_PizzaToppings_AB_unique" ON public."_PizzaToppings" USING btree ("A", "B");
 .   DROP INDEX public."_PizzaToppings_AB_unique";
       public            user    false    228    228            �           1259    41238    _PizzaToppings_B_index    INDEX     T   CREATE INDEX "_PizzaToppings_B_index" ON public."_PizzaToppings" USING btree ("B");
 ,   DROP INDEX public."_PizzaToppings_B_index";
       public            user    false    228            �           1259    41187    _RolePermissions_AB_unique    INDEX     f   CREATE UNIQUE INDEX "_RolePermissions_AB_unique" ON public."_RolePermissions" USING btree ("A", "B");
 0   DROP INDEX public."_RolePermissions_AB_unique";
       public            user    false    223    223            �           1259    41188    _RolePermissions_B_index    INDEX     X   CREATE INDEX "_RolePermissions_B_index" ON public."_RolePermissions" USING btree ("B");
 .   DROP INDEX public."_RolePermissions_B_index";
       public            user    false    223            �           2606    57691    Order Order_pizzaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES public."Pizza"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pizzaId_fkey";
       public          user    false    217    3265    230            �           2606    57686    Order Order_restaurantId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES public."Restaurant"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_restaurantId_fkey";
       public          user    false    225    3274    230            �           2606    57681    Order Order_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_userId_fkey";
       public          user    false    230    3263    215            �           2606    57666    Pizza Pizza_restaurantId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Pizza"
    ADD CONSTRAINT "Pizza_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES public."Restaurant"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Pizza" DROP CONSTRAINT "Pizza_restaurantId_fkey";
       public          user    false    225    217    3274            �           2606    57676 $   Restaurant Restaurant_managerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Restaurant"
    ADD CONSTRAINT "Restaurant_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."Restaurant" DROP CONSTRAINT "Restaurant_managerId_fkey";
       public          user    false    3263    215    225            �           2606    57661    Role Role_restaurantId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES public."Restaurant"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_restaurantId_fkey";
       public          user    false    225    220    3274            �           2606    57671 !   Topping Topping_restaurantId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Topping"
    ADD CONSTRAINT "Topping_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES public."Restaurant"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."Topping" DROP CONSTRAINT "Topping_restaurantId_fkey";
       public          user    false    227    3274    225            �           2606    57656    User User_roleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_roleId_fkey";
       public          user    false    220    215    3267            �           2606    41306 $   _OrderToppings _OrderToppings_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_OrderToppings"
    ADD CONSTRAINT "_OrderToppings_A_fkey" FOREIGN KEY ("A") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."_OrderToppings" DROP CONSTRAINT "_OrderToppings_A_fkey";
       public          user    false    3280    230    231            �           2606    41311 $   _OrderToppings _OrderToppings_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_OrderToppings"
    ADD CONSTRAINT "_OrderToppings_B_fkey" FOREIGN KEY ("B") REFERENCES public."Topping"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."_OrderToppings" DROP CONSTRAINT "_OrderToppings_B_fkey";
       public          user    false    3276    227    231            �           2606    41239 $   _PizzaToppings _PizzaToppings_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_PizzaToppings"
    ADD CONSTRAINT "_PizzaToppings_A_fkey" FOREIGN KEY ("A") REFERENCES public."Pizza"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."_PizzaToppings" DROP CONSTRAINT "_PizzaToppings_A_fkey";
       public          user    false    3265    217    228            �           2606    41244 $   _PizzaToppings _PizzaToppings_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_PizzaToppings"
    ADD CONSTRAINT "_PizzaToppings_B_fkey" FOREIGN KEY ("B") REFERENCES public."Topping"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."_PizzaToppings" DROP CONSTRAINT "_PizzaToppings_B_fkey";
       public          user    false    228    3276    227            �           2606    41189 (   _RolePermissions _RolePermissions_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_RolePermissions"
    ADD CONSTRAINT "_RolePermissions_A_fkey" FOREIGN KEY ("A") REFERENCES public."Permission"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."_RolePermissions" DROP CONSTRAINT "_RolePermissions_A_fkey";
       public          user    false    222    3269    223            �           2606    41194 (   _RolePermissions _RolePermissions_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_RolePermissions"
    ADD CONSTRAINT "_RolePermissions_B_fkey" FOREIGN KEY ("B") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."_RolePermissions" DROP CONSTRAINT "_RolePermissions_B_fkey";
       public          user    false    220    223    3267               �   x���Aj�@еt�\�B�hF�m�!��EW��9*Z���������0<���ܯ��6pt�pmaNΆz�^V?���zH	S�j8�6�8���kzjn���]q�5��E��E�a���ղ#y-(��lX���f�� Ά���eeώQr暑�e�k���u�n�7ͷ�k~���������x܉�	 R�}�      w   �   x�e��N1E��W��س��*ر	�5��I�<�گ'��&ʽ��!k���+���fD��na�|�
��\��3����(��_H�*����Δ�)Ѹ<2��x��83K�=��>H^}�ͣ4��͟��&�-G�_��4�K�ja�	��P��Y��f��H5S���ܑ�t�L��K�hGjb��G�ܥ@�8Q\lJֻU ����\�ZB&���+�~���t��      r   �   x���1� @�N��.�v�#2�Qq�49}�� �������n1�T�� �����JK��;ri�*KN�5BKD#3<f�$:1���t��z��L7���-����^�ZbXs�m�@���cv�M�ft��A4v0<yw��Vy�:      z   �  x����n� E��+��f�1�m�k�J��M7���y
��(���6�.�*R�BB���l�\����1.|E��xHJ��Υl��ӱ�˭Rjbª�X+��IS��.Y��r��F��4�٨�].|*D�o��Ai��#�������S�[��+�v�`��;M
!Nu	�|�r\�0���z�� r�-^ؗ!;�ޟwʅ �g�Q��'�[�;q
���R>m�`�C����;��Ca�3(�����8�J7Xs���[)��пI��}����}�x���}J2��Sʇ��
�֥�ɥuM��=�l�|��{��?�V�B���;?�v��݈^ZH��hz%�?�F�i�5����i;5|���!�R�̑j~-�(gz��dg	��!�G;�b��9�ΰ1�3�}N9��B���[��}�/5�i;�<b��4�[ӕyr����p�^�tu�
+,�3rY��AJ�{ �L�W�1����:���M�u?'a      u   /  x���;n�0К</`��!)n�ąk7� ǁm	�e��a~0��٨���bj�]��2.j�U�B��qi��J���F��k[�i}���?�ji�Eh�Yt�"�
r�5 �X��Zn��8B�YdP�X\g���� ����w��x�QS}�o��ل^S}�_"_�ݥ���|E��������@�Q��p��>��qA������W�`!�,m�Qs�S�ڟI����i��㸘i|3�|��(.�f��9�+$�A�<�üh���i����PM^\���[��;��=�      |   >   x�3�,�/(��KW0�45�4�2�q��9���SA��\&H�`S��1�H F��� ��      p   �  x�}��ҪZ���<ǙU};������ 5�Ȗ��N��Ow�(��!�/W�ʕ%z�-j@���鶈j�B#,�a�� ߩ�;I|�8��\�ãl�v���K�\;s��1�4���$[$H@���#r����D=zT�$������W�ۯM'�	�̈i�'�(M=�^�:dRvS��^<�*}��#!�l��a,g�	�H��+��K`1�^��f��ɗ\!��u[�d�<D�ʦaYVU�T(T�͡��DR�S�aH�6�^G/��<U���'���e9��4�xSq�U��U4��r��˛��J}7 %~Q�P�?��O�Pl���2�k˜��z�7R�'��sE��w>��^��������)@�o���܂�X&4i�5���-_�h���d��J(y���f��ޥq�VM0I�� �o��齭��l�9yA0U}�� ��3�r��/��0M��5�h��.��®4ij[��L��1������7�6��~���3ý$/ X'A��n�/����O�ct[�
��΍<"��kO��lc����V#<E"w�X��� C��� ᣀ�0��8{ӆℓZW@+S;q}GE�})���t�l=�Zu����ii�g�Qh�o�ۺ+���T��-N�|ޙ%Ʉ@��5��A�q6��K�h���沫׃ggf���Jv�DP�W�� ���L�������B�91�V,�O�Me��r:�}�l!_�z��q�ݘ��V�����+�%��G��f)O ����L��(|⟖!��kc�0;�"��x�����Җ�Zg��[à��wN��L�-V��N��/R`�_9Dpȫ��k�"�ðھ0��m�%<$*�:0�4�S�P��X�^�z�~>i�^[��(��c�K����,2 �q"��k����V�.R4�[�nz��_���Z��n1L��'n�.N�����f�f1�g�y�8������[Ѽ]�|�<��������m���kؠ�ފ�܈O|8^86|�D��I���9�퐟8Cz���c���Sv*�Z�d�����/�!3^nPVq��]2G*k`8ja�:�4}�nnga�,S�e��R�9	���^Ctp�jP�"����}t��?k��?�t��x��^��]�O���O��91lxh���پ>�*��Nk���8�l���m�셮��ԗ	P�8�PS&ss�&)P��U�/����|V��6w7�uĐ�ky�-�N|�;��q��sc�iҝ�v#��h�&��}�JP^�KVv�x�bم@{B�+�H���?��b��T����:�W��uح}��Fm�����x�_�<OZ`΁�8��8�O[�9�l_Y�FZl�O��B���R���\����6w����
��?�C0a��s��U=�S�����{�dIT�P8睂�$h}`�*?�q�N1�6�}��C@�'� ¯��!��������+�      �   ;   x�%���@���0���va�9p�ö��"W+4��*C�������h���C���
L      }   0   x�ƹ  �����]�p���I�W^���f�m�'��H>���      x   �   x����!C�C1�1�����c�|ȓ%'A��|�PjYS�(�rm�5^�
,�~������m�AT�qQ����ʰb�j���e��V��Q8
�Z������bv1��]�.f�q���'��קlp@�	.�����QޔV�WiV�m�"VĊX˹� V�Ub�X%V�Ub�=i����@�`o���v�/��.K^�䛌����I�     