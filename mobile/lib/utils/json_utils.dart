class JsonX {
  static String? str(Map<String, dynamic> j, List<String> keys) {
    for (final k in keys) {
      final v = j[k];
      if (v == null) continue;
      if (v is String) return v;
      return v.toString();
    }
    return null;
  }

  static bool boolish(Map<String, dynamic> j, List<String> keys, {bool def = false}) {
    for (final k in keys) {
      final v = j[k];
      if (v == null) continue;
      if (v is bool) return v;
      if (v is num) return v != 0;
      if (v is String) return v.toLowerCase() == 'true' || v == '1';
    }
    return def;
  }

  static int? intOrNull(Map<String, dynamic> j, List<String> keys) {
    for (final k in keys) {
      final v = j[k];
      if (v == null) continue;
      if (v is int) return v;
      if (v is num) return v.toInt();
      if (v is String) return int.tryParse(v);
    }
    return null;
  }

  static DateTime? dt(Map<String, dynamic> j, List<String> keys) {
    final s = str(j, keys);
    if (s == null || s.isEmpty) return null;
    try {
      return DateTime.parse(s);
    } catch (_) {
      return null;
    }
  }

  static Map<String, dynamic>? map(Map<String, dynamic> j, List<String> keys) {
    for (final k in keys) {
      final v = j[k];
      if (v is Map<String, dynamic>) return v;
    }
    return null;
  }
}
