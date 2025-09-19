import 'package:flutter/material.dart';

/// Diálogo simples de confirmação. Retorna true se confirmar.
Future<bool> confirmDialog(
    BuildContext context, {
      String title = 'Confirmar',
      required String message,
      String cancelLabel = 'Cancelar',
      String confirmLabel = 'Confirmar',
    }) async {
  final ok = await showDialog<bool>(
    context: context,
    builder: (_) => AlertDialog(
      title: Text(title),
      content: Text(message),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context, false), child: Text(cancelLabel)),
        FilledButton(onPressed: () => Navigator.pop(context, true), child: Text(confirmLabel)),
      ],
    ),
  );
  return ok == true;
}

/// Fluxo genérico de "confirmar → remover visualmente → deletar → snack com desfazer".
/// - [onOptimisticRemove]: remova o item da UI (setState) antes da chamada real.
/// - [onRestore]: reponha o item na UI caso falhe ou usuário aperte "Desfazer".
/// - [deleteFn]: operação real de exclusão; retorne true se deu certo.
Future<void> confirmAndDeleteOptimistic({
  required BuildContext context,
  required String itemLabel, // para mensagens ("Álbum X")
  required VoidCallback onOptimisticRemove,
  required Future<bool> Function() deleteFn,
  required VoidCallback onRestore,
  String dialogTitle = 'Excluir',
  String dialogConfirmLabel = 'Excluir',
  String dialogCancelLabel = 'Cancelar',
  String? successMessage,         // opcional; usa padrão se null
  String failureMessage = 'Falha ao excluir.',
  String undoLabel = 'Desfazer',
}) async {
  final confirmed = await confirmDialog(
    context,
    title: dialogTitle,
    message: 'Deseja realmente excluir "$itemLabel"?',
    cancelLabel: dialogCancelLabel,
    confirmLabel: dialogConfirmLabel,
  );
  if (!confirmed) return;

  // Otimista: remove da UI
  onOptimisticRemove();

  try {
    final ok = await deleteFn();
    if (!ok) {
      onRestore();
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(failureMessage)));
      return;
    }

    // Sucesso: SnackBar com desfazer
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(successMessage ?? '“$itemLabel” excluído.'),
        action: SnackBarAction(
          label: undoLabel,
          onPressed: onRestore,
        ),
      ),
    );
  } catch (e) {
    onRestore();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('$failureMessage Detalhes: $e')),
    );
  }
}
