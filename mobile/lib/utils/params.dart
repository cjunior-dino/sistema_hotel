/// Constrói um Map<String, dynamic> a partir de uma lista de pares (key, value),
/// ignorando nulls e, opcionalmente, strings vazias.
Map<String, dynamic> params(
    Iterable<(String, dynamic)?> items, {
      bool dropEmptyStrings = true,
    }) {
  final out = <String, dynamic>{};
  for (final item in items) {
    if (item == null) continue;
    final (key, value) = item;
    if (value == null) continue;
    if (dropEmptyStrings && value is String && value.trim().isEmpty) continue;
    out[key] = value;
  }
  return out;
}
