"use client";

const IGNORED_MESSAGE = "Transition was aborted because of invalid state";

function isBenignViewTransitionAbort(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("message" in error)) return false;
  const message = String(error.message);
  return (
    message === IGNORED_MESSAGE ||
    message.startsWith(`${IGNORED_MESSAGE}.`) ||
    message.includes("document visibility state") ||
    message.includes("Document hidden") ||
    message.includes("viewport size changed")
  );
}

function installViewTransitionGuard() {
  if (typeof document === "undefined" || typeof Document === "undefined") return;
  const native = Document.prototype.startViewTransition;
  if (typeof native !== "function") return;
  if (document.startViewTransition !== native) return;

  document.startViewTransition = function startViewTransition(callbackOptions) {
    const transition = native.call(this, callbackOptions);
    const ready = transition.ready.then(
      (value) => value,
      (error: unknown) => {
        if (!isBenignViewTransitionAbort(error)) throw error;
        throw new DOMException(IGNORED_MESSAGE, "InvalidStateError");
      },
    );
    const finished = transition.finished.then(
      (value) => value,
      (error: unknown) => {
        if (isBenignViewTransitionAbort(error)) return undefined;
        throw error;
      },
    );
    const updateCallbackDone = transition.updateCallbackDone.then(
      (value) => value,
      (error: unknown) => {
        if (isBenignViewTransitionAbort(error)) return undefined;
        throw error;
      },
    );

    return {
      finished,
      ready,
      updateCallbackDone,
      skipTransition() {
        transition.skipTransition();
      },
      get types() {
        return transition.types;
      },
    };
  };
}

installViewTransitionGuard();

export function ViewTransitionGuard() {
  return null;
}
