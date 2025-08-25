--
-- PostgreSQL database dump
--

\restrict FR4kHROcjC3g48zDVrJmGxmTddTYFiItZuaOclFTabx7Y8OJiZnb3PqR8Vhxg2d

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ai_plan_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_plan_results (
    id integer NOT NULL,
    plan_id integer NOT NULL,
    user_id integer NOT NULL,
    gemini_result text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ai_plan_results OWNER TO postgres;

--
-- Name: ai_plan_results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ai_plan_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ai_plan_results_id_seq OWNER TO postgres;

--
-- Name: ai_plan_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ai_plan_results_id_seq OWNED BY public.ai_plan_results.id;


--
-- Name: plan_invites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_invites (
    id integer NOT NULL,
    plan_id integer,
    token text NOT NULL,
    used boolean DEFAULT false
);


ALTER TABLE public.plan_invites OWNER TO postgres;

--
-- Name: plan_invites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plan_invites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plan_invites_id_seq OWNER TO postgres;

--
-- Name: plan_invites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plan_invites_id_seq OWNED BY public.plan_invites.id;


--
-- Name: plan_participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_participants (
    id integer NOT NULL,
    plan_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.plan_participants OWNER TO postgres;

--
-- Name: plan_participants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plan_participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plan_participants_id_seq OWNER TO postgres;

--
-- Name: plan_participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plan_participants_id_seq OWNED BY public.plan_participants.id;


--
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    id integer NOT NULL,
    organizer_id integer,
    title text NOT NULL,
    destination text,
    departure text,
    arrival text,
    departure_date date,
    departure_time time without time zone,
    arrival_date date,
    arrival_time time without time zone,
    transport text,
    daily_budget integer,
    total_budget integer,
    status text DEFAULT 'confirmed'::text
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plans_id_seq OWNER TO postgres;

--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plans_id_seq OWNED BY public.plans.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    password_hash text NOT NULL,
    crowd_tolerance integer,
    interests text[],
    food_conditions text,
    travel_pace text,
    language text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ai_plan_results id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_plan_results ALTER COLUMN id SET DEFAULT nextval('public.ai_plan_results_id_seq'::regclass);


--
-- Name: plan_invites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_invites ALTER COLUMN id SET DEFAULT nextval('public.plan_invites_id_seq'::regclass);


--
-- Name: plan_participants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_participants ALTER COLUMN id SET DEFAULT nextval('public.plan_participants_id_seq'::regclass);


--
-- Name: plans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN id SET DEFAULT nextval('public.plans_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ai_plan_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ai_plan_results (id, plan_id, user_id, gemini_result, created_at) FROM stdin;
1	2	3		2025-08-25 06:04:43.01918
2	2	1	Plan002にご参加の皆様、この度は岐阜へのご旅行をご検討いただきありがとうございます。\n\n皆様の興味（自然、アクティビティ、アウトドア、ショッピング、アート）をバランスよく取り入れ、アクティブ派とゆったり派、どちらのニーズにもお応えできるような岐阜旅行プランをご提案いたします。\n\n---\n\n### 【重要：ご予算に関するご案内】\nご提示いただいた**「総予算: 40000円」は、参加者4名様全体での予算**と解釈いたしました。\nこの予算額では、鹿児島から岐阜への往復交通費（公共交通機関利用）のみで大幅に予算を上回ってしまい、さらに宿泊費、食費、現地でのアクティビティ費用を含めると、**本プランの実施は極めて困難である**ことを最初にお伝えしなければなりません。\n\n具体的には、鹿児島から岐阜への公共交通機関での往復移動費は、お一人様あたり**約45,000円～55,000円程度**かかる見込みです。また、宿泊費や食費、アクティビティ費用を含めると、**お一人様あたり合計で約85,000円～105,000円程度**が必要となります。\n\nしたがって、本プランは**「もし、ご旅行の予算が大幅に見直され、お一人様あたり最低でも10万円程度確保できる場合」**を想定して作成しております。ご提案のプラン内容をご参照いただき、ご予算について改めてご検討いただけますと幸いです。\n\n---\n\n### プラン名: 世界遺産と伝統文化を満喫！アクティブ＆ゆったり岐阜の旅\n\n### 旅行のコンセプト\n飛騨高山の歴史ある町並み散策と、世界遺産白川郷での感動的な合掌造り集落体験をメインに、岐阜の豊かな自然、伝統文化、アート、そして美味しいグルメを満喫する旅。アクティブに動き回りたい方も、ゆったりと景色を楽しみたい方も、それぞれのペースで楽しめる選択肢をご用意しました。\n\n### 移動手段\n鹿児島空港 ⇔ 中部国際空港（飛行機）\n中部国際空港 ⇔ 名古屋駅（名鉄）\n名古屋駅 ⇔ 高山駅（JR特急ワイドビューひだ）\n岐阜県内移動：路線バス、一部タクシー\n\n### 宿泊\n高山市内のビジネスホテルまたは旅館（2泊）\n\n---\n\n### 詳細プラン\n\n#### 1日目：2025年8月25日(月) 鹿児島出発～高山へ移動・宿泊\n\n*   **15:00** 鹿児島空港を出発（飛行機）\n    *   LCCを利用し、中部国際空港へ向かいます。\n*   **夕方** 中部国際空港到着後、名鉄で名古屋駅へ移動。\n*   **夜** 名古屋駅よりJR特急「ワイドビューひだ」に乗車し、飛騨高山へ。\n    *   長時間の移動となりますので、車内でお弁当などを召し上がるのも良いでしょう。\n*   **21:00頃** 高山駅に到着。ホテルへチェックインし、長旅の疲れを癒します。\n*   **夕食** ホテル周辺で高山ラーメンなど手軽に済ませ、明日の観光に備えましょう。\n\n#### 2日目：2025年8月26日(火) 飛騨高山散策と文化・自然体験\n\n*   **午前** 飛騨高山の古い町並み「さんまち通り」を散策。\n    *   **全員:** 飛騨高山のシンボルである古い町並みを自由に散策。情緒あふれる風景を楽しみながら、写真撮影や食べ歩き（飛騨牛握り寿司、みたらし団子など）を楽しみましょう。\n    *   **ゆったり派・ショッピング派（User002, User007）:** 地酒の試飲、民芸品店や土産物店でショッピングを満喫。\n    *   **アート派（User007, User009）:** 高山陣屋の見学で江戸時代の役所の様子を学ぶ。\n    *   **アクティブ派・自然派（User001）:** 早起きして宮川朝市を訪れたり、レンタサイクルを借りて高山市内を巡り、城山公園などの自然豊かな場所へ足を延ばす。\n*   **昼食** 高山の郷土料理を堪能。「朴葉味噌定食」や「飛騨牛まぶし」などがおすすめです。\n*   **午後** それぞれの興味に合わせた体験を。\n    *   **ゆったり派・アート派（User002, User007, User009）:** 「飛騨高山まつりの森」や「高山祭屋台会館」で、豪華絢爛な高山祭の屋台や伝統工芸品を鑑賞し、飛騨の文化に触れます。\n    *   **アクティブ派・自然派（User001, User007）:** バスで「新穂高ロープウェイ」へ（高山から約90分）。日本唯一の2階建てゴンドラで、北アルプスの壮大なパノラマ絶景を堪能します。山頂駅周辺を軽く散策したり、足湯でリフレッシュするのも良いでしょう。\n*   **夕食** 飛騨牛専門レストランで、極上の飛騨牛ステーキやしゃぶしゃぶを味わい、旅の思い出に花を咲かせましょう。\n*   **宿泊** 高山市内ホテル\n\n#### 3日目：2025年8月27日(水) 世界遺産白川郷観光～鹿児島へ移動\n\n*   **午前** 高山濃飛バスセンターより、世界遺産「白川郷」へ路線バスで移動（約50分）。\n    *   **全員:** 合掌造り集落を散策。独特の建築様式を持つ家屋群を間近で見学し、日本の原風景が広がる景観を楽しみましょう。\n    *   **ゆったり派・自然派（User002）:** 「城山展望台」へ足を運び、合掌造り集落全体を見渡せる絶景を堪能。\n    *   **アート派（User007, User009）:** 重要文化財の「和田家」や「神田家」など、公開されている合掌造り家屋を見学し、内部の構造や暮らしの知恵に触れる。\n    *   **アクティブ派（User001, User007）:** 集落内をレンタサイクルで巡り、隅々まで探索するのもおすすめです。\n*   **昼食** 白川郷内で郷土料理を味わえるお店へ。「とちもち」や「そば」などが人気です。\n*   **午後** 白川郷を後にして、鹿児島への帰路へ。\n    *   白川郷からバスで高山へ戻り、JR特急「ワイドビューひだ」で名古屋駅へ。\n    *   名古屋駅から中部国際空港へ（名鉄）。\n    *   中部国際空港より鹿児島空港へ（飛行機、深夜便）。\n    *   **【注意】** この時間帯に鹿児島への直行深夜便がない場合、中部国際空港周辺での仮眠や宿泊が必要となる可能性がございます。その際は追加の費用が発生しますので、事前に航空便の時刻をご確認ください。\n*   **深夜** 飛行機での移動（車中泊に準ずる）。\n\n#### 4日目：2025年8月28日(木) 鹿児島到着\n\n*   **02:33** 鹿児島空港到着。お疲れ様でした！\n\n---\n\n### 費用概算（お一人当たり・もし予算が確保できる場合）\n\n*   **交通費**（鹿児島⇔中部国際空港往復航空券、名鉄、JR特急ワイドビューひだ、バス）：\n    約45,000円～55,000円\n    *   LCCの早期割引や各種キャンペーンを最大限活用した場合の目安です。\n*   **宿泊費**（高山市内ビジネスホテル2泊）：\n    約10,000円～15,000円\n    *   1泊あたり5,000円～7,500円程度のホテルを想定。\n*   **食費**（1日10,000円×2日分）：\n    約20,000円\n*   **アクティビティ・観光施設入場料・現地交通費等**：\n    約10,000円～15,000円\n    *   新穂高ロープウェイ、高山陣屋、白川郷入場料、レンタサイクル、バス代など。\n\n**合計：約85,000円～105,000円**\n\n---\n\n### その他\n\n*   **8月下旬の岐阜**：日中は大変暑くなることが予想されます。帽子、日焼け止め、水分補給はこまめに行い、熱中症対策を万全にしてください。\n*   **服装**：動きやすい服装と歩きやすい靴がおすすめです。山間部では天候が変わりやすいこともあるため、薄手の羽織ものや雨具の準備もしておくと安心です。\n*   **予約**：白川郷や高山は人気観光地ですので、航空券、列車、宿泊、一部のバス（特に白川郷行き）は事前に予約されることを強くお勧めします。\n*   **食事条件**：不明なため、今回は一般的なお食事を想定しております。アレルギーや食事制限がある場合は、事前にレストランへご確認ください。\n\nこのプランが皆様の岐阜旅行の計画にお役立ていただければ幸いです。楽しいご旅行になりますように！	2025-08-25 06:09:04.375336
3	2	1	User001様、User002様、User003様、User007様、User009様、User021様\n\n皆様の多様な興味と旅行ペースを考慮し、岐阜を存分に楽しめる旅行プランをご提案します。鹿児島からの長距離移動となるため、効率的に岐阜の魅力を満喫できるよう、飛騨高山を拠点に、世界遺産白川郷や下呂温泉を巡るプランとしました。\n\n---\n\n### **【岐阜満喫！自然・文化・温泉巡り 3日間】**\n\n#### **プランのポイント**\n*   **多様な興味をカバー:** 自然（白川郷、高山周辺）、アクティビティ（高山散策、温泉街散策）、アウトドア（高山周辺の軽い散策）、ショッピング（高山、温泉街）、観光（白川郷、高山古い町並）、温泉（下呂温泉）、アート（高山の匠の技、工芸品）をバランス良く盛り込みました。\n*   **ペースの調和:** アクティブ派には散策や少し足を延ばすオプションを、ゆったり派には休憩を挟みながら楽しめるスポットや温泉でのリラックスタイムを提供します。\n*   **公共交通機関での移動:** 飛騨高山を拠点とし、バスや電車で周辺観光地へアクセスします。\n\n#### **予算に関する留意事項**\nご提示いただいた「一日の予算: 10000円」「総予算: 40000円」について、鹿児島からの新幹線往復費用（お一人様片道約25,000円～30,000円程度、合計約50,000円～60,000円）は含まれていないと想定し、**このプランでは岐阜県内での交通費、食費、観光施設入場料、お土産代などを「1日1人あたり10,000円程度」に収めることを目指します**。鹿児島～岐阜間の往復交通費は別途ご考慮ください。\n\n---\n\n#### **日程概要**\n\n*   **1日目 (8月25日): 鹿児島から飛騨高山へ移動、夜は高山泊**\n*   **2日目 (8月26日): 世界遺産白川郷と飛騨高山散策（高山泊）**\n*   **3日目 (8月27日): 下呂温泉でリラックス＆高山自由時間（高山泊）**\n*   **4日目 (8月28日): 岐阜から鹿児島へ移動**\n\n---\n\n#### **詳細な旅行プラン**\n\n**【1日目】2025年8月25日 (月) 移動日：鹿児島から飛騨高山へ**\n\n*   **15:00** 鹿児島中央駅出発（新幹線にて名古屋へ）\n    *   長距離移動となるため、車内で快適に過ごせるよう準備。\n*   **18:00～19:00頃** 名古屋駅到着、JRワイドビューひだに乗り換え（約2時間半）\n    *   新幹線と特急の乗り継ぎはスムーズに行えるよう事前予約がおすすめです。\n*   **21:00～22:00頃** JR高山駅到着\n    *   駅周辺のホテルにチェックイン。\n*   **夕食:** 高山駅周辺で軽く済ませるか、ホテルで済ませて、翌日に備えて早めの休息を。\n*   **宿泊:** 飛騨高山（高山駅周辺）\n\n**【2日目】2025年8月26日 (火) 世界遺産白川郷と飛騨高山の歴史散策**\n\n*   **午前:** **白川郷合掌造り集落へ**\n    *   高山濃飛バスセンターから世界遺産バスで白川郷へ（約50分）。\n    *   **アクティブ派:** 合掌造りの集落をゆっくり散策しながら、展望台（シャトルバス利用）からの絶景を楽しむ。\n    *   **ゆったり派:** 興味のある合掌造り家屋（和田家、神田家など）に入場し、内部を見学。のんびりとお土産物屋さんを巡る。\n    *   **自然/アウトドア派:** 周囲の里山の景色や庄川のせせらぎを満喫。\n    *   **観光派:** 世界遺産の歴史と日本の原風景を写真に収める。\n*   **昼食:** 白川郷内で地元の食材を使った素朴な料理を。\n*   **午後:** **飛騨高山「古い町並」散策とショッピング**\n    *   バスで高山へ戻り、国の重要伝統的建造物群保存地区「古い町並（さんまち通り）」を散策。\n    *   **ショッピング派:** 伝統工芸品、地酒、飛騨牛グルメ、和菓子などのお土産探し。\n    *   **観光/アート派:** 趣のある町屋建築を眺めたり、酒蔵を見学したり、地元のアートギャラリーを覗く。\n    *   **ゆったり派:** 喫茶店で一服したり、人力車に乗って風情を感じる。\n*   **夕食:** 飛騨高山で名物の飛騨牛料理（朴葉味噌焼き、握りなど）を堪能。\n*   **宿泊:** 飛騨高山\n\n**【3日目】2025年8月27日 (水) 日本三名泉・下呂温泉と高山フリータイム**\n\n*   **午前:** **日本三名泉「下呂温泉」で癒しのひととき**\n    *   JR高山駅からJR特急ひだまたは普通列車で下呂駅へ（特急で約45分、普通で約1時間半）。\n    *   **温泉派:** 下呂温泉の公衆浴場「白鷺の湯」や、複数の温泉宿が提供する日帰り入浴を利用して、つるつるの美肌の湯を満喫。\n    *   **ゆったり派:** 温泉街を散策し、足湯巡りを楽しむ。\n    *   **自然/観光派:** 飛騨川のせせらぎや温泉街の風情を楽しむ。\n*   **昼食:** 下呂温泉街で鶏ちゃん（けいちゃん）など地元の味を。\n*   **午後:** **高山へ戻り、各自の興味に合わせた自由時間**\n    *   **アクティブ派:** 高山城跡（城山公園）への軽いハイキングで自然を満喫、または飛騨の里（合掌造り集落の野外博物館）で郷土の文化と自然に触れる。\n    *   **ショッピング/アート派:** 高山陣屋の見学（観光）、朝市（宮川朝市・陣屋前朝市）で地元の人々と触れ合いながら買い物、または匠の技が光る工芸品店巡り。\n    *   **ゆったり派:** 気に入ったカフェでくつろいだり、ホテルでゆっくり過ごしたり。\n*   **夕食:** 最終日の夜は、高山でそれぞれの好みのお店を選んで。\n*   **宿泊:** 飛騨高山\n\n**【4日目】2025年8月28日 (木) 岐阜から鹿児島へ**\n\n*   **午前:**\n    *   チェックアウト。出発時刻まで高山でのんびり過ごす。\n    *   **ショッピング派:** 買い残したお土産を探したり、もう一度古い町並を散策するのも良いでしょう。\n*   **02:33 (これは鹿児島到着時刻のため、岐阜出発は午前中～昼頃と想定)** JR高山駅から名古屋駅へ特急ひだで移動。\n*   **名古屋駅から鹿児島中央駅へ新幹線で移動。**\n*   **深夜** 鹿児島中央駅到着。\n\n---\n\n#### **旅行費用（岐阜県内、1人あたり目安）**\n\n*   **交通費:** （高山～白川郷バス往復：約4,600円、高山～下呂JR往復：特急利用約3,000円、普通約1,800円）合計約6,000円～8,000円\n*   **食費:** （昼食2回、夕食3回） 1食あたり1,500円～3,000円として約9,000円～18,000円\n*   **観光施設入場料:** （白川郷の家屋、高山陣屋、日帰り温泉など） 合計約2,000円～4,000円\n*   **お土産・その他:** 5,000円～10,000円\n*   **合計:** **約22,000円～40,000円程度**\n    *   ※食事の内容や利用施設によって変動します。1日1万円の予算で十分に楽しめる内容です。\n\n#### **持ち物・準備**\n\n*   **服装:** 8月は岐阜も非常に暑くなります。Tシャツ、短パンなどの夏服を基本に、日差し対策の帽子、サングラス、薄手の羽織もの（冷房対策にも）をご用意ください。\n*   **靴:** 散策が多いので、歩きやすい靴が必須です。\n*   **その他:** 日焼け止め、虫よけスプレー、熱中症対策のための水分補給グッズ（水筒など）\n*   **予約:** 新幹線、特急ひだ、宿泊施設は早期の予約をおすすめします。特に白川郷行きのバスは事前予約が確実です。\n\n---\n\nこのプランはあくまで一例です。皆様の興味や体力に合わせて、柔軟に調整してください。\n岐阜の豊かな自然、歴史ある文化、そして心地よい温泉を、皆様で存分にお楽しみください！	2025-08-25 06:51:14.503503
\.


--
-- Data for Name: plan_invites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_invites (id, plan_id, token, used) FROM stdin;
1	2	6d225895-d30e-42db-9012-eddc85405a8f	f
2	2	74bcdc54-c9b4-4d4d-b1b2-4838764fd3a9	f
3	2	ae65e6aa-4be8-466e-b249-6e6f067d6f7e	f
4	2	651c3224-94c1-4102-9b0b-4ccb6c3a9bc6	f
5	2	b93a4ce5-893f-4c54-829d-7425b9b9b01f	t
6	2	38a6b8e2-839a-45ac-bb4e-795d4e2f5dc3	t
7	2	7d86850b-78d3-4882-b9f8-20af9b086aec	f
8	2	a904d703-3d2e-4965-a2e4-abd6c662f7fd	f
9	2	2c3c4f94-a00a-4aab-b520-45270c19169e	f
10	2	0c3d528e-350d-44b9-aaba-fd6a9cc31c6f	t
11	2	e81a1376-af53-47c0-8668-69adaca57deb	t
12	2	0cecf90c-b835-4f8b-86f6-317ca78ce997	f
13	2	dc9039b0-8692-4a7a-b178-5c15d5f49360	f
14	2	4ec55b55-7384-45bd-af4e-b3a7a4d8eb0d	f
15	2	1ba0bd02-43eb-4709-87e5-4f765c06eaae	f
16	2	3b1e7ced-c5e5-4329-8e00-0c9d2f35f695	f
17	2	9bca447e-043a-4807-b916-3482747bb115	f
\.


--
-- Data for Name: plan_participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_participants (id, plan_id, user_id) FROM stdin;
1	1	3
2	2	3
3	2	1
5	2	7
7	2	10
9	2	4
10	2	12
\.


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plans (id, organizer_id, title, destination, departure, arrival, departure_date, departure_time, arrival_date, arrival_time, transport, daily_budget, total_budget, status) FROM stdin;
1	3	Plan001	北海道	鹿児島	鹿児島	2025-08-19	00:58:00	2025-08-23	04:58:00	公共交通	10000	50000	confirmed
2	3	Plan002	岐阜	鹿児島	鹿児島	2025-08-26	23:33:00	2025-08-29	02:33:00	公共交通	10000	40000	confirmed
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, crowd_tolerance, interests, food_conditions, travel_pace, language) FROM stdin;
2	User001	User001@exsample.com	$2b$10$AgESLcvMflk4NXQ38o0I.ODSW/83m1bOoInEdDGljxA1FwG2XRdhu	5	{自然,アクティビティ,アウトドア}		アクティブ	ja
3	User002	User002@exsapmle.com	$2b$10$iPLZcvcncHPUO3Gt53zrN.XtReqsKR.Hyz0TYaC.5KyvsLNYhErCy	1	{ショッピング,自然}		ゆったり	ja
4	User003	\N	$2b$10$6uqf8E8nqgxM0hB.zHgR/ufi1A0uAFn1VJRlgOm5/mSFZoKzLMas6	1	{観光,温泉}		ゆったり	ja
5	User004	\N	$2b$10$MMKJ491LQQkNGHFyEgfs5.aaz5.Zirf/DpBNAz2Z/DPWYn9SrXsQy	5	{アクティビティ,アート}		アクティブ	ja
6	User005	\N	$2b$10$a2/sGRYGsaOR6DbQ9kHcLuaEwYACaM5fzxUbe4yr58vFfQ4f44uu.	1	{自然,歴史}		ゆったり	ja
7	User007	\N	$2b$10$wl.JV/XXb5mLxYt6sVPVEuQI2FDKkun7XWvSm5iFUJw8sNM1bX/SW	5	{アウトドア,アート,ショッピング}		アクティブ	ja
8	User007	\N	$2b$10$1nwqNiib7EdWF7xGDFs5/u2pvNgeQyCrFy/3iUHi8jwoeSfL2UwOy	5	{アウトドア,アート,ショッピング}		アクティブ	en
9	User008	\N	$2b$10$qQAiSDIa2GgJ7y38M3YKaulsixFTAaSfyE17GpPViOzz8MkT5AfXy	3	{アクティビティ,ショッピング,アウトドア}		アクティブ	en
10	User009	\N	$2b$10$kG2geSpjLg4K95GnYRYrVOis54zczjDWrSYsmHn.BVWvvRw6YpzDq	3	{アクティビティ,アート}		ゆったり	ja
11	User010	\N	$2b$10$qoEqMHNb6azMga8xXsPy1O1BonER6k3bQgG3.dzmvprOVk7RFHW6i	3	{アクティビティ,歴史}		ゆったり	ja
12	User021		$2b$10$Sl2Ux7EaGnvBT.syikQw8OrZaVxhNUXoITCgwXnywZ1wDGWDzeRi6	3	{自然,アクティビティ}		ゆったり	ja
1	User001	User001@exsample.com	$2b$10$ZEgv3fPIcBiPz2vsBU6OHerwhOsH/8JH5yxVw9enwRz6nwW7fjX62	5	{自然,アクティビティ,アウトドア}		アクティブ	ja
\.


--
-- Name: ai_plan_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ai_plan_results_id_seq', 3, true);


--
-- Name: plan_invites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plan_invites_id_seq', 17, true);


--
-- Name: plan_participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plan_participants_id_seq', 10, true);


--
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plans_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: ai_plan_results ai_plan_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_plan_results
    ADD CONSTRAINT ai_plan_results_pkey PRIMARY KEY (id);


--
-- Name: plan_invites plan_invites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_invites
    ADD CONSTRAINT plan_invites_pkey PRIMARY KEY (id);


--
-- Name: plan_participants plan_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_participants
    ADD CONSTRAINT plan_participants_pkey PRIMARY KEY (id);


--
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


--
-- Name: plan_participants unique_plan_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_participants
    ADD CONSTRAINT unique_plan_user UNIQUE (plan_id, user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ai_plan_results ai_plan_results_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_plan_results
    ADD CONSTRAINT ai_plan_results_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id) ON DELETE CASCADE;


--
-- Name: ai_plan_results ai_plan_results_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_plan_results
    ADD CONSTRAINT ai_plan_results_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: plan_invites plan_invites_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_invites
    ADD CONSTRAINT plan_invites_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id) ON DELETE CASCADE;


--
-- Name: plan_participants plan_participants_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_participants
    ADD CONSTRAINT plan_participants_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id) ON DELETE CASCADE;


--
-- Name: plan_participants plan_participants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_participants
    ADD CONSTRAINT plan_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: plans plans_organizer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_organizer_id_fkey FOREIGN KEY (organizer_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict FR4kHROcjC3g48zDVrJmGxmTddTYFiItZuaOclFTabx7Y8OJiZnb3PqR8Vhxg2d

