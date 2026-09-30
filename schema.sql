-- ============================================================
-- ขวานคอนเสิร์ต (Khwan Concert) — Database Schema
-- ระบบจองบัตรคอนเสิร์ต พร้อมที่นั่งแบบ Interactive
-- ============================================================

-- ============ 1. ผู้ใช้ ============
CREATE TABLE users (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  email         VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(100) NOT NULL,
  phone         VARCHAR(20),
  role          ENUM('customer','organizer','gate_staff','admin') DEFAULT 'customer',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============ 2. คอนเสิร์ต ============
CREATE TABLE concerts (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  organizer_id  INT NOT NULL,
  title         VARCHAR(200) NOT NULL,
  artist        VARCHAR(150),
  description   TEXT,
  venue         VARCHAR(200),
  event_date    DATE NOT NULL,
  event_time    TIME,
  poster_emoji  VARCHAR(10),
  category      VARCHAR(50),
  status        ENUM('draft','on_sale','sold_out','ended') DEFAULT 'draft',
  max_per_user  INT DEFAULT 4,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- ============ 3. โซนและราคา ============
CREATE TABLE zones (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  concert_id INT NOT NULL,
  name       VARCHAR(20) NOT NULL,   -- VIP, A, B, C
  price      DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (concert_id) REFERENCES concerts(id)
);

-- ============ 4. ที่นั่ง ============
CREATE TABLE seats (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  concert_id  INT NOT NULL,
  zone_id     INT NOT NULL,
  row_label   VARCHAR(10) NOT NULL,  -- V1, A1, B2
  seat_number INT NOT NULL,
  status      ENUM('available','held','sold') DEFAULT 'available',
  UNIQUE KEY uk_seat (concert_id, row_label, seat_number),
  FOREIGN KEY (concert_id) REFERENCES concerts(id),
  FOREIGN KEY (zone_id) REFERENCES zones(id)
);

-- ============ 5. การล็อกที่นั่งชั่วคราว (15 นาที) ============
CREATE TABLE seat_holds (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  seat_id    INT NOT NULL,
  user_id    INT NOT NULL,
  hold_until DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seat_id) REFERENCES seats(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============ 6. คำสั่งซื้อ ============
CREATE TABLE orders (
  id             INT PRIMARY KEY AUTO_INCREMENT,
  user_id        INT NOT NULL,
  concert_id     INT NOT NULL,
  total_amount   DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(30),
  status         ENUM('pending','paid','cancelled','refunded') DEFAULT 'pending',
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (concert_id) REFERENCES concerts(id)
);

-- ============ 7. บัตร (E-Ticket) ============
CREATE TABLE tickets (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  order_id      INT NOT NULL,
  seat_id       INT NOT NULL,
  ticket_code   VARCHAR(50) UNIQUE NOT NULL,
  price         DECIMAL(10,2) NOT NULL,
  status        ENUM('valid','used','refunded') DEFAULT 'valid',
  checked_in_at DATETIME NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (seat_id) REFERENCES seats(id)
);

-- ============ 8. ประวัติการคืนบัตร (คืน 90%) ============
CREATE TABLE refunds (
  id             INT PRIMARY KEY AUTO_INCREMENT,
  ticket_id      INT NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  refund_amount  DECIMAL(10,2) NOT NULL,  -- 90%
  refunded_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);
