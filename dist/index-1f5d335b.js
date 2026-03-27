var J = class extends Error {
  constructor(a) {
    super(a.message), this.kind = "response", this.data = a.data, this.status = a.status;
  }
}, P = class extends Error {
  constructor(a, e) {
    super(JSON.stringify(a.issues)), this.kind = "validation", this.issues = a.issues, this.data = e;
  }
}, h = (a) => {
  const e = {};
  return a.forEach((n) => {
    new Headers(n).forEach((t, y) => {
      t === "null" || t === "undefined" ? delete e[y] : e[y] = t;
    });
  }), e;
}, U = (a, e) => (
  // if AbortSignal.any is not supported
  // AbortSignal.timeout is not supported either.
  // Feature detection is fine on AbortSignal.any only
  "any" in AbortSignal ? AbortSignal.any(
    [a, e && AbortSignal.timeout(e)].filter(
      Boolean
    )
  ) : a
), x = (a, e = []) => {
  const n = { ...a };
  for (const t in n)
    e.includes(t) && delete n[t];
  return n;
}, B = (a) => z(a) || Array.isArray(a) || typeof (a == null ? void 0 : a.toJSON) == "function", z = (a) => {
  var e;
  return a && typeof a == "object" && ((e = a.constructor) == null ? void 0 : e.name) === "Object";
}, T = (a = "", e, n, t, y) => {
  e = e.href ?? e;
  const r = y({
    // Removing the 'url.searchParams.keys()' from the defaultParams
    // but not from the 'fetcherParams'. The user is responsible for not
    // specifying the params in both the "input" and the fetcher "params" option.
    ...x(n, [
      ...new URL(e, "http://a").searchParams.keys()
    ]),
    ...t
  });
  let o = /^https?:\/\//.test(e) ? e : !a || !e ? a + e : a.replace(/\/$/, "") + "/" + e.replace(/^\//, "");
  return r && (o += (o.includes("?") ? "&" : "?") + r.replace(/^\?/, "")), o;
}, $ = (a, e) => new Promise((n, t) => {
  e == null || e.addEventListener("abort", r, { once: !0 });
  const y = setTimeout(() => {
    e == null || e.removeEventListener("abort", r), n();
  }, a);
  function r() {
    clearTimeout(y), t(e.reason);
  }
});
async function H(a, e) {
  const n = await a["~standard"].validate(e);
  if (n.issues)
    throw new P(n, e);
  return n.value;
}
var b = {
  parseResponse: (a) => a.clone().json().catch(() => a.text()).then((e) => e || null),
  parseRejected: async (a, e) => new J({
    message: `[${a.status}] ${a.statusText}`,
    status: a.status,
    data: await b.parseResponse(a, e)
  }),
  // TODO: find a lighter way to do this with about the same amount of code
  serializeParams: (a) => (
    // JSON.parse(JSON.stringify(params)) recursively transforms Dates to ISO strings and strips undefined
    new URLSearchParams(
      JSON.parse(JSON.stringify(a))
    ).toString()
  ),
  serializeBody: (a) => B(a) ? JSON.stringify(a) : a,
  reject: (a) => !a.ok,
  retry: {
    when: (a) => {
      var e;
      return ((e = a.response) == null ? void 0 : e.ok) === !1;
    },
    attempts: 0,
    delay: 0
  }
}, W = typeof window < "u" && /AppleWebKit/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
async function N(a, e) {
  const n = "ok" in a;
  if (W && !n || !e || !a.clone().body)
    return a;
  const y = a.headers.get("content-length");
  let r = y ? +y : void 0;
  !n && !y && (r = (await a.clone().arrayBuffer()).byteLength);
  let o = 0;
  await e(
    {
      totalBytes: r,
      transferredBytes: o,
      chunk: new Uint8Array()
    },
    a
  );
  const c = new ReadableStream({
    async start(i) {
      const w = a.body.getReader();
      for (; ; ) {
        const { value: d, done: l } = await w.read();
        if (l)
          break;
        o += d.byteLength, await e(
          {
            totalBytes: r,
            transferredBytes: o,
            chunk: d
          },
          a
        ), i.enqueue(d);
      }
      i.close();
    }
  });
  return n ? new Response(c, a) : (
    // @ts-expect-error outdated ts types
    new Request(a, { body: c, duplex: "half" })
  );
}
var m = {}, D = (a, e = () => m) => async (n, t = m, y) => {
  var l, S, v, g, R, k, A, E, j, L;
  const r = await e(n, t, y), o = {
    ...b,
    ...r,
    ...t,
    ...m,
    retry: {
      ...b.retry,
      ...r.retry,
      ...t.retry
    }
  };
  o.body = t.body === null || t.body === void 0 ? t.body : o.serializeBody(t.body), o.headers = h([
    B(t.body) && typeof o.body == "string" ? { "content-type": "application/json" } : {},
    r.headers,
    t.headers
  ]);
  let c = 0, i, w, d;
  do {
    o.signal = U(t.signal, o.timeout), i = await N(
      new Request(
        n.url ? n : T(
          o.baseUrl,
          n,
          r.params,
          t.params,
          o.serializeParams
        ),
        o
      ),
      t.onRequestStreaming
    );
    try {
      await ((l = r.onRequest) == null ? void 0 : l.call(r, i)), await ((S = t.onRequest) == null ? void 0 : S.call(t, i)), w = await N(
        await a(
          i,
          // do not override the request body & patch headers again
          { ...x(o, ["body"]), headers: i.headers },
          y
        ),
        t.onResponseStreaming
      ), d = void 0;
    } catch (s) {
      d = s;
    }
    try {
      if (!await o.retry.when({ request: i, response: w, error: d }) || ++c > (typeof o.retry.attempts == "function" ? await o.retry.attempts({ request: i }) : o.retry.attempts))
        break;
      const s = { attempt: c, request: i, response: w, error: d };
      await $(
        typeof o.retry.delay == "function" ? await o.retry.delay(s) : o.retry.delay,
        o.signal
      ), await ((v = r.onRetry) == null ? void 0 : v.call(r, s)), await ((g = t.onRetry) == null ? void 0 : g.call(t, s));
    } catch (s) {
      d = s;
      break;
    }
  } while (!0);
  try {
    if (await ((R = r.onResponse) == null ? void 0 : R.call(r, w, i)), await ((k = t.onResponse) == null ? void 0 : k.call(t, w, i)), d)
      throw d;
    if (await o.reject(w))
      throw await o.parseRejected(w, i);
    const s = await o.parseResponse(w, i), u = o.schema ? await H(o.schema, s) : s;
    return await ((A = r.onSuccess) == null ? void 0 : A.call(r, u, i)), await ((E = t.onSuccess) == null ? void 0 : E.call(t, u, i)), u;
  } catch (s) {
    throw await ((j = r.onError) == null ? void 0 : j.call(r, s, i)), await ((L = t.onError) == null ? void 0 : L.call(t, s, i)), s;
  }
};
export {
  J as ResponseError,
  P as ResponseValidationError,
  B as isJsonifiable,
  D as up
};
