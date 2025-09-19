import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

/// Cliente REST genérico com suporte a listas do DRF (results) e {data: ...}
class RestClient<T> {
  final String baseUrl;
  final String resource;
  final http.Client _http;
  final T Function(Map<String, dynamic> json) decoder;

  Map<String, String> defaultHeaders = {
    HttpHeaders.acceptHeader: 'application/json',
    HttpHeaders.contentTypeHeader: 'application/json',
  };

  RestClient({
    required this.baseUrl,
    required this.resource,
    required this.decoder,
    http.Client? httpClient,
    Map<String, String>? headers,
  }) : _http = httpClient ?? http.Client() {
    if (headers != null) defaultHeaders.addAll(headers);
  }

  Uri _uri([String? path, Map<String, dynamic>? query]) {
    final qp = query?.map((k, v) => MapEntry(k, '$v'));
    final full = [
      baseUrl,
      resource,
      if (path != null) path
    ].join('');
    return Uri.parse(full).replace(queryParameters: qp);
  }

  Never _throwHttp(http.Response res) =>
      throw HttpException('HTTP ${res.statusCode}: ${res.body}');

  /// GET /resource/?query...
  /// Aceita lista direta [ ... ] OU DRF { results: [ ... ] }
  Future<List<T>> getAll({Map<String, dynamic>? query, Map<String, String>? headers}) async {
    try {
      final res = await _http
          .get(_uri(null, query), headers: {...defaultHeaders, if (headers != null) ...headers})
          .timeout(const Duration(seconds: 20));

      if (res.statusCode == 200) {
        final body = jsonDecode(res.body);
        final list = (body is List)
            ? body
            : (body is Map && body['results'] is List)
            ? body['results']
            : (body is Map && body['data'] is List)
            ? body['data']
            : null;

        if (list is List) {
          return list.cast<Map<String, dynamic>>().map(decoder).toList();
        }
        throw const FormatException('Formato inesperado para lista');
      }
      _throwHttp(res);
    } on SocketException {
      throw const HttpException('Sem conexão com a internet');
    } on FormatException {
      throw const HttpException('Erro ao decodificar o JSON');
    }
  }

  /// GET /resource/{id}/
  Future<T> getById(dynamic id, {Map<String, String>? headers}) async {
    try {
      final res = await _http
          .get(_uri('$id/'), headers: {...defaultHeaders, if (headers != null) ...headers})
          .timeout(const Duration(seconds: 20));

      if (res.statusCode == 200) {
        final Map<String, dynamic> body = jsonDecode(res.body);
        final map = (body['data'] is Map) ? Map<String, dynamic>.from(body['data']) : body;
        return decoder(map);
      }
      _throwHttp(res);
    } on SocketException {
      throw const HttpException('Sem conexão com a internet');
    } on FormatException {
      throw const HttpException('Erro ao decodificar o JSON');
    }
  }

  Future<T> create(Map<String, dynamic> body, {Map<String, String>? headers}) async {
    try {
      final res = await _http
          .post(
        _uri(),
        headers: {...defaultHeaders, if (headers != null) ...headers},
        body: jsonEncode(body),
      )
          .timeout(const Duration(seconds: 20));

      if (res.statusCode == 201 || res.statusCode == 200) {
        final Map<String, dynamic> json = jsonDecode(res.body);
        final map = (json['data'] is Map) ? Map<String, dynamic>.from(json['data']) : json;
        return decoder(map);
      }
      _throwHttp(res);
    } on SocketException {
      throw const HttpException('Sem conexão com a internet');
    } on FormatException {
      throw const HttpException('Erro ao decodificar o JSON');
    }
  }

  Future<T> patch(dynamic id, Map<String, dynamic> body, {Map<String, String>? headers}) async {
    try {
      final res = await _http
          .patch(
        _uri('$id/'),
        headers: {...defaultHeaders, if (headers != null) ...headers},
        body: jsonEncode(body),
      )
          .timeout(const Duration(seconds: 20));

      if (res.statusCode == 200) {
        final Map<String, dynamic> json = jsonDecode(res.body);
        final map = (json['data'] is Map) ? Map<String, dynamic>.from(json['data']) : json;
        return decoder(map);
      }
      _throwHttp(res);
    } on SocketException {
      throw const HttpException('Sem conexão com a internet');
    } on FormatException {
      throw const HttpException('Erro ao decodificar o JSON');
    }
  }

  Future<bool> delete(dynamic id, {Map<String, String>? headers}) async {
    try {
      final res = await _http
          .delete(
        _uri('$id/'),
        headers: {...defaultHeaders, if (headers != null) ...headers},
      )
          .timeout(const Duration(seconds: 20));

      if (res.statusCode == 204 || res.statusCode == 200) return true;
      _throwHttp(res);
    } on SocketException {
      throw const HttpException('Sem conexão com a internet');
    }
  }
}
