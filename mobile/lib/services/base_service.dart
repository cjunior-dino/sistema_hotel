import 'rest_client.dart';

class BaseService<T> {
  final RestClient<T> client;
  BaseService(this.client);

  Future<List<T>> list({Map<String, dynamic>? query, Map<String, String>? headers}) =>
      client.getAll(query: query, headers: headers);

  Future<T> retrieve(dynamic id, {Map<String, String>? headers}) =>
      client.getById(id, headers: headers);

  Future<T> create(Map<String, dynamic> body, {Map<String, String>? headers}) =>
      client.create(body, headers: headers);

  Future<T> patch(dynamic id, Map<String, dynamic> body, {Map<String, String>? headers}) =>
      client.patch(id, body, headers: headers);

  Future<bool> delete(dynamic id, {Map<String, String>? headers}) =>
      client.delete(id, headers: headers);
}
