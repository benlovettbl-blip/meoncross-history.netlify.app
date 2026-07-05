import 'package:flutter/material';

class AppTheme {
  // Light Theme Colors
  static const Color lightBgMain = Color(0xFFF8FAFC);
  static const Color lightBgSurface = Color(0xFFFFFFFF);
  static const Color lightPrimary = Color(0xFF4F46E5);
  static const Color lightAccentCrimson = Color(0xFFBE123C);
  static const Color lightAccentGold = Color(0xFFCA8A04);
  static const Color lightTextGold = Color(0xFFB45309);
  static const Color lightAccentGreen = Color(0xFF059669);
  static const Color lightTextMain = Color(0xFF0F172A);
  static const Color lightTextMuted = Color(0xFF475569);
  static const Color lightBorder = Color(0x140F172A); // rgba(15, 23, 42, 0.08)

  // Dark Theme Colors
  static const Color darkBgMain = Color(0xFF0B1329);
  static const Color darkBgSurface = Color(0xFF121C38);
  static const Color darkBgSurfaceHover = Color(0xFF1B284E);
  static const Color darkPrimary = Color(0xFF6366F1);
  static const Color darkTextGold = Color(0xFFF59E0B);
  static const Color darkTextMain = Color(0xFFF3F4F6);
  static const Color darkTextMuted = Color(0xFF9CA3AF);
  static const Color darkBorder = Color(0x14FFFFFF); // rgba(255, 255, 255, 0.08)

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: lightPrimary,
      scaffoldBackgroundColor: lightBgMain,
      colorScheme: const ColorScheme.light(
        primary: lightPrimary,
        secondary: lightAccentGold,
        error: lightAccentCrimson,
        surface: lightBgSurface,
        onSurface: lightTextMain,
      ),
      cardTheme: CardTheme(
        color: lightBgSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
          side: const BorderSide(color: lightBorder, width: 1.0),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: lightBorder,
        thickness: 1.0,
      ),
      textTheme: const TextTheme(
        headlineMedium: TextStyle(
          fontFamily: 'Outfit',
          fontSize: 28,
          fontWeight: FontWeight.w800,
          color: lightTextMain,
        ),
        titleLarge: TextStyle(
          fontFamily: 'Outfit',
          fontSize: 20,
          fontWeight: FontWeight.w700,
          color: lightTextMain,
        ),
        titleMedium: TextStyle(
          fontFamily: 'Outfit',
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: lightTextMain,
        ),
        bodyLarge: TextStyle(
          fontFamily: 'Plus Jakarta Sans',
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: lightTextMain,
          height: 1.5,
        ),
        bodyMedium: TextStyle(
          fontFamily: 'Plus Jakarta Sans',
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: lightTextMuted,
          height: 1.5,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: lightPrimary,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          textStyle: const TextStyle(
            fontFamily: 'Outfit',
            fontWeight: FontWeight.w600,
            fontSize: 15,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: lightTextMain,
          side: const BorderSide(color: lightBorder),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          textStyle: const TextStyle(
            fontFamily: 'Outfit',
            fontWeight: FontWeight.w600,
            fontSize: 15,
          ),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: darkPrimary,
      scaffoldBackgroundColor: darkBgMain,
      colorScheme: const ColorScheme.dark(
        primary: darkPrimary,
        secondary: darkTextGold,
        error: lightAccentCrimson,
        surface: darkBgSurface,
        onSurface: darkTextMain,
      ),
      cardTheme: CardTheme(
        color: darkBgSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
          side: const BorderSide(color: darkBorder, width: 1.0),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: darkBorder,
        thickness: 1.0,
      ),
      textTheme: const TextTheme(
        headlineMedium: TextStyle(
          fontFamily: 'Outfit',
          fontSize: 28,
          fontWeight: FontWeight.w800,
          color: darkTextMain,
        ),
        titleLarge: TextStyle(
          fontFamily: 'Outfit',
          fontSize: 20,
          fontWeight: FontWeight.w700,
          color: darkTextMain,
        ),
        titleMedium: TextStyle(
          fontFamily: 'Outfit',
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: darkTextMain,
        ),
        bodyLarge: TextStyle(
          fontFamily: 'Plus Jakarta Sans',
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: darkTextMain,
          height: 1.5,
        ),
        bodyMedium: TextStyle(
          fontFamily: 'Plus Jakarta Sans',
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: darkTextMuted,
          height: 1.5,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: darkPrimary,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          textStyle: const TextStyle(
            fontFamily: 'Outfit',
            fontWeight: FontWeight.w600,
            fontSize: 15,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: darkTextMain,
          side: const BorderSide(color: darkBorder),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          textStyle: const TextStyle(
            fontFamily: 'Outfit',
            fontWeight: FontWeight.w600,
            fontSize: 15,
          ),
        ),
      ),
    );
  }
}
