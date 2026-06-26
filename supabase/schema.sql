-- ============================================================
-- piolAndTako — Schéma de base de données Supabase
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT, phone TEXT, avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'traveler' CHECK (role IN ('traveler', 'host', 'vehicle_owner', 'admin', 'support')),
  bio TEXT, city TEXT, is_verified BOOLEAN DEFAULT FALSE, is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.accommodations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL, description TEXT,
  type TEXT NOT NULL CHECK (type IN ('apartment', 'studio', 'villa', 'hotel', 'house', 'residence', 'room', 'hostel')),
  city TEXT NOT NULL, neighborhood TEXT, address TEXT,
  latitude DECIMAL(10, 8), longitude DECIMAL(11, 8),
  price_per_night INTEGER NOT NULL, currency TEXT DEFAULT 'XAF',
  max_guests INTEGER DEFAULT 1, bedrooms INTEGER DEFAULT 1, bathrooms INTEGER DEFAULT 1, size_sqm INTEGER,
  amenities TEXT[] DEFAULT '{}', images TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE, is_featured BOOLEAN DEFAULT FALSE, is_verified BOOLEAN DEFAULT FALSE,
  min_nights INTEGER DEFAULT 1, max_nights INTEGER,
  cancellation_policy TEXT DEFAULT 'flexible' CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict')),
  rating DECIMAL(3,2) DEFAULT 0, review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL, description TEXT,
  type TEXT NOT NULL CHECK (type IN ('city_car', 'suv', 'sedan', 'pickup', 'bus', 'motorcycle', 'luxury', 'wedding')),
  brand TEXT, model TEXT, year INTEGER, city TEXT NOT NULL,
  price_per_day INTEGER NOT NULL, currency TEXT DEFAULT 'XAF',
  transmission TEXT DEFAULT 'automatic' CHECK (transmission IN ('automatic', 'manual')),
  with_driver BOOLEAN DEFAULT FALSE,
  fuel_type TEXT DEFAULT 'petrol' CHECK (fuel_type IN ('petrol', 'diesel', 'electric', 'hybrid')),
  seats INTEGER DEFAULT 5, images TEXT[] DEFAULT '{}', features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE, is_featured BOOLEAN DEFAULT FALSE, is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0, review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.accommodation_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  accommodation_id UUID NOT NULL REFERENCES public.accommodations(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES public.profiles(id),
  check_in DATE NOT NULL, check_out DATE NOT NULL, guests_count INTEGER NOT NULL DEFAULT 1,
  total_price INTEGER NOT NULL, service_fee INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'refunded')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method TEXT, payment_reference TEXT, guest_note TEXT, host_note TEXT,
  cancellation_reason TEXT, cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.vehicle_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  renter_id UUID NOT NULL REFERENCES public.profiles(id),
  start_date DATE NOT NULL, end_date DATE NOT NULL,
  total_price INTEGER NOT NULL, service_fee INTEGER NOT NULL DEFAULT 0,
  pickup_location TEXT, dropoff_location TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'refunded')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method TEXT, payment_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('accommodation', 'vehicle')),
  listing_id UUID NOT NULL, booking_id UUID,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5), comment TEXT,
  cleanliness_rating INTEGER CHECK (cleanliness_rating BETWEEN 1 AND 5),
  communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
  location_rating INTEGER CHECK (location_rating BETWEEN 1 AND 5),
  value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
  host_response TEXT, host_responded_at TIMESTAMPTZ, is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id),
  receiver_id UUID NOT NULL REFERENCES public.profiles(id),
  booking_type TEXT CHECK (booking_type IN ('accommodation', 'vehicle')),
  booking_id UUID, content TEXT NOT NULL, is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('accommodation', 'vehicle')),
  listing_id UUID NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, listing_type, listing_id)
);

CREATE TABLE public.accommodation_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  accommodation_id UUID NOT NULL REFERENCES public.accommodations(id) ON DELETE CASCADE,
  date DATE NOT NULL, is_available BOOLEAN DEFAULT TRUE, custom_price INTEGER,
  UNIQUE(accommodation_id, date)
);

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  plan TEXT NOT NULL CHECK (plan IN ('free', 'pro', 'agency')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  started_at TIMESTAMPTZ DEFAULT NOW(), expires_at TIMESTAMPTZ,
  payment_method TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_owner_write" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "accommodations_public_read" ON public.accommodations FOR SELECT USING (is_active = true);
CREATE POLICY "accommodations_host_write" ON public.accommodations FOR ALL USING (auth.uid() = host_id);
CREATE POLICY "vehicles_public_read" ON public.vehicles FOR SELECT USING (is_active = true);
CREATE POLICY "vehicles_owner_write" ON public.vehicles FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "acc_bookings_read" ON public.accommodation_bookings FOR SELECT USING (auth.uid() = guest_id OR auth.uid() IN (SELECT host_id FROM public.accommodations WHERE id = accommodation_id));
CREATE POLICY "acc_bookings_guest_create" ON public.accommodation_bookings FOR INSERT WITH CHECK (auth.uid() = guest_id);
CREATE POLICY "veh_bookings_read" ON public.vehicle_bookings FOR SELECT USING (auth.uid() = renter_id OR auth.uid() IN (SELECT owner_id FROM public.vehicles WHERE id = vehicle_id));
CREATE POLICY "veh_bookings_renter_create" ON public.vehicle_bookings FOR INSERT WITH CHECK (auth.uid() = renter_id);
CREATE POLICY "reviews_public_read" ON public.reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "reviews_reviewer_write" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "messages_parties_access" ON public.messages FOR ALL USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "favorites_owner_access" ON public.favorites FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_accommodations_city ON public.accommodations(city);
CREATE INDEX idx_accommodations_type ON public.accommodations(type);
CREATE INDEX idx_accommodations_host ON public.accommodations(host_id);
CREATE INDEX idx_accommodations_active ON public.accommodations(is_active);
CREATE INDEX idx_vehicles_city ON public.vehicles(city);
CREATE INDEX idx_vehicles_type ON public.vehicles(type);
CREATE INDEX idx_acc_bookings_guest ON public.accommodation_bookings(guest_id);
CREATE INDEX idx_veh_bookings_renter ON public.vehicle_bookings(renter_id);
CREATE INDEX idx_reviews_listing ON public.reviews(listing_type, listing_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id, is_read);

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_accommodations_updated_at BEFORE UPDATE ON public.accommodations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_acc_bookings_updated_at BEFORE UPDATE ON public.accommodation_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_veh_bookings_updated_at BEFORE UPDATE ON public.vehicle_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
