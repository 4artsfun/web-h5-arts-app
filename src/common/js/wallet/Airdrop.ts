import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Cell;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.asCell();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type EntData = {
    $$type: 'EntData';
    total_supply: bigint;
    mintable: boolean;
    max_supply: bigint;
}

export function storeEntData(src: EntData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeBit(src.mintable);
        b_0.storeCoins(src.max_supply);
    };
}

export function loadEntData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _max_supply = sc_0.loadCoins();
    return { $$type: 'EntData' as const, total_supply: _total_supply, mintable: _mintable, max_supply: _max_supply };
}

function loadTupleEntData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _max_supply = source.readBigNumber();
    return { $$type: 'EntData' as const, total_supply: _total_supply, mintable: _mintable, max_supply: _max_supply };
}

function storeTupleEntData(source: EntData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeNumber(source.max_supply);
    return builder.build();
}

function dictValueParserEntData(): DictionaryValue<EntData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEntData(src)).endCell());
        },
        parse: (src) => {
            return loadEntData(src.loadRef().beginParse());
        }
    }
}

export type RewardArray = {
    $$type: 'RewardArray';
    addressBoolMap: Dictionary<Address, boolean>;
    addressIntMap: Dictionary<Address, bigint>;
    length: bigint;
}

export function storeRewardArray(src: RewardArray) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.addressBoolMap, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeDict(src.addressIntMap, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.length, 257);
    };
}

export function loadRewardArray(slice: Slice) {
    let sc_0 = slice;
    let _addressBoolMap = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _addressIntMap = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'RewardArray' as const, addressBoolMap: _addressBoolMap, addressIntMap: _addressIntMap, length: _length };
}

function loadTupleRewardArray(source: TupleReader) {
    let _addressBoolMap = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _addressIntMap = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'RewardArray' as const, addressBoolMap: _addressBoolMap, addressIntMap: _addressIntMap, length: _length };
}

function storeTupleRewardArray(source: RewardArray) {
    let builder = new TupleBuilder();
    builder.writeCell(source.addressBoolMap.size > 0 ? beginCell().storeDictDirect(source.addressBoolMap, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.addressIntMap.size > 0 ? beginCell().storeDictDirect(source.addressIntMap, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserRewardArray(): DictionaryValue<RewardArray> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRewardArray(src)).endCell());
        },
        parse: (src) => {
            return loadRewardArray(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    amount: bigint;
    receiver: Address;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4235234258, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4235234258) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type JettonAddress = {
    $$type: 'JettonAddress';
    jetton_address: Address;
}

export function storeJettonAddress(src: JettonAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(929526012, 32);
        b_0.storeAddress(src.jetton_address);
    };
}

export function loadJettonAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 929526012) { throw Error('Invalid prefix'); }
    let _jetton_address = sc_0.loadAddress();
    return { $$type: 'JettonAddress' as const, jetton_address: _jetton_address };
}

function loadTupleJettonAddress(source: TupleReader) {
    let _jetton_address = source.readAddress();
    return { $$type: 'JettonAddress' as const, jetton_address: _jetton_address };
}

function storeTupleJettonAddress(source: JettonAddress) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.jetton_address);
    return builder.build();
}

function dictValueParserJettonAddress(): DictionaryValue<JettonAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonAddress(src)).endCell());
        },
        parse: (src) => {
            return loadJettonAddress(src.loadRef().beginParse());
        }
    }
}

export type TransferToOwner = {
    $$type: 'TransferToOwner';
    query_id: bigint;
    amount: bigint;
}

export function storeTransferToOwner(src: TransferToOwner) {
    console.log("src", src)
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1898858149, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
    };
}

export function loadTransferToOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1898858149) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    return { $$type: 'TransferToOwner' as const, query_id: _query_id, amount: _amount };
}

function loadTupleTransferToOwner(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'TransferToOwner' as const, query_id: _query_id, amount: _amount };
}

function storeTupleTransferToOwner(source: TransferToOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserTransferToOwner(): DictionaryValue<TransferToOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransferToOwner(src)).endCell());
        },
        parse: (src) => {
            return loadTransferToOwner(src.loadRef().beginParse());
        }
    }
}

export type RewardAddress = {
    $$type: 'RewardAddress';
    query_id: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeRewardAddress(src: RewardAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(81808020, 32);
        b_0.storeUint(src.query_id, 64);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadRewardAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 81808020) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'RewardAddress' as const, query_id: _query_id, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleRewardAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'RewardAddress' as const, query_id: _query_id, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleRewardAddress(source: RewardAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserRewardAddress(): DictionaryValue<RewardAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRewardAddress(src)).endCell());
        },
        parse: (src) => {
            return loadRewardAddress(src.loadRef().beginParse());
        }
    }
}

export type Append = {
    $$type: 'Append';
    receiver: Address;
    mark: boolean;
    amount: bigint;
}

export function storeAppend(src: Append) {
    console.log("src", src);
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1550945009, 32);
        b_0.storeAddress(src.receiver);
        b_0.storeBit(src.mark);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadAppend(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1550945009) { throw Error('Invalid prefix'); }
    let _receiver = sc_0.loadAddress();
    let _mark = sc_0.loadBit();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Append' as const, receiver: _receiver, mark: _mark, amount: _amount };
}

function loadTupleAppend(source: TupleReader) {
    let _receiver = source.readAddress();
    let _mark = source.readBoolean();
    let _amount = source.readBigNumber();
    return { $$type: 'Append' as const, receiver: _receiver, mark: _mark, amount: _amount };
}

function storeTupleAppend(source: Append) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    builder.writeBoolean(source.mark);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserAppend(): DictionaryValue<Append> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAppend(src)).endCell());
        },
        parse: (src) => {
            return loadAppend(src.loadRef().beginParse());
        }
    }
}

export type UpdateAddressInfo = {
    $$type: 'UpdateAddressInfo';
    receiver: Address;
    mark: boolean;
    amount: bigint;
}

export function storeUpdateAddressInfo(src: UpdateAddressInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(744304769, 32);
        b_0.storeAddress(src.receiver);
        b_0.storeBit(src.mark);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadUpdateAddressInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 744304769) { throw Error('Invalid prefix'); }
    let _receiver = sc_0.loadAddress();
    let _mark = sc_0.loadBit();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'UpdateAddressInfo' as const, receiver: _receiver, mark: _mark, amount: _amount };
}

function loadTupleUpdateAddressInfo(source: TupleReader) {
    let _receiver = source.readAddress();
    let _mark = source.readBoolean();
    let _amount = source.readBigNumber();
    return { $$type: 'UpdateAddressInfo' as const, receiver: _receiver, mark: _mark, amount: _amount };
}

function storeTupleUpdateAddressInfo(source: UpdateAddressInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    builder.writeBoolean(source.mark);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserUpdateAddressInfo(): DictionaryValue<UpdateAddressInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateAddressInfo(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateAddressInfo(src.loadRef().beginParse());
        }
    }
}

export type Replace = {
    $$type: 'Replace';
    ddressBoolMap: Dictionary<Address, boolean>;
    addressIntMap: Dictionary<Address, bigint>;
    length: bigint;
}

export function storeReplace(src: Replace) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3312879613, 32);
        b_0.storeDict(src.ddressBoolMap, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeDict(src.addressIntMap, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.length, 257);
    };
}

export function loadReplace(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3312879613) { throw Error('Invalid prefix'); }
    let _ddressBoolMap = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _addressIntMap = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Replace' as const, ddressBoolMap: _ddressBoolMap, addressIntMap: _addressIntMap, length: _length };
}

function loadTupleReplace(source: TupleReader) {
    let _ddressBoolMap = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _addressIntMap = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Replace' as const, ddressBoolMap: _ddressBoolMap, addressIntMap: _addressIntMap, length: _length };
}

function storeTupleReplace(source: Replace) {
    let builder = new TupleBuilder();
    builder.writeCell(source.ddressBoolMap.size > 0 ? beginCell().storeDictDirect(source.ddressBoolMap, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.addressIntMap.size > 0 ? beginCell().storeDictDirect(source.addressIntMap, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserReplace(): DictionaryValue<Replace> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReplace(src)).endCell());
        },
        parse: (src) => {
            return loadReplace(src.loadRef().beginParse());
        }
    }
}

 type Airdrop_init_args = {
    $$type: 'Airdrop_init_args';
    owner: Address;
}

function initAirdrop_init_args(src: Airdrop_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function Airdrop_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initAirdrop_init_args({ $$type: 'Airdrop_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Airdrop_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    5862: { message: `No items in the array to update!` },
    6947: { message: `No items in the array!` },
    14534: { message: `Not owner` },
    16059: { message: `Invalid value` },
    17848: { message: `No items in the array to delete!` },
    18668: { message: `Can't Mint Anymore` },
    23951: { message: `Insufficient gas` },
    32846: { message: `Not true` },
    42469: { message: `No space in the array left for new items!` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    62972: { message: `Invalid balance` },
}

const Airdrop_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"EntData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"max_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"RewardArray","header":null,"fields":[{"name":"addressBoolMap","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"addressIntMap","type":{"kind":"dict","key":"address","value":"int"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonAddress","header":929526012,"fields":[{"name":"jetton_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TransferToOwner","header":1898858149,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"RewardAddress","header":81808020,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Append","header":1550945009,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"mark","type":{"kind":"simple","type":"bool","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateAddressInfo","header":744304769,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"mark","type":{"kind":"simple","type":"bool","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Replace","header":3312879613,"fields":[{"name":"ddressBoolMap","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"addressIntMap","type":{"kind":"dict","key":"address","value":"int"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Airdrop_getters: ABIGetter[] = [
    {"name":"get_AirdropJetton_info","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_RewardArrayAll_info","arguments":[],"returnType":{"kind":"simple","type":"RewardArray","optional":false}},
    {"name":"get_MaxArraySize","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_RewardArray_info","arguments":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"Append","optional":false}},
    {"name":"get_RewardArrayLenght","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Airdrop_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JettonAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RewardAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferToOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Replace"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Append"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateAddressInfo"}},
    {"receiver":"internal","message":{"kind":"text","text":"deleteAllRewardMint"}},
]

export class Airdrop implements Contract {

    static async init(owner: Address) {
        return await Airdrop_init(owner);
    }

    static async fromInit(owner: Address) {
        const init = await Airdrop_init(owner);
        const address = contractAddress(0, init);
        return new Airdrop(address, init);
    }

    static fromAddress(address: Address) {
        return new Airdrop(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Airdrop_types,
        getters: Airdrop_getters,
        receivers: Airdrop_receivers,
        errors: Airdrop_errors,
    };

    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonAddress | RewardAddress | TransferToOwner | Replace | Append | UpdateAddressInfo | 'deleteAllRewardMint') {

        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonAddress') {
            body = beginCell().store(storeJettonAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RewardAddress') {
            body = beginCell().store(storeRewardAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferToOwner') {
            body = beginCell().store(storeTransferToOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Replace') {
            body = beginCell().store(storeReplace(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Append') {
            body = beginCell().store(storeAppend(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateAddressInfo') {
            body = beginCell().store(storeUpdateAddressInfo(message)).endCell();
        }
        if (message === 'deleteAllRewardMint') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }

        await provider.internal(via, { ...args, body: body });

    }

    async getGetAirdropJettonInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_AirdropJetton_info', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }

    async getGetRewardArrayAllInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_RewardArrayAll_info', builder.build())).stack;
        const result = loadTupleRewardArray(source);
        return result;
    }

    async getGetMaxArraySize(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_MaxArraySize', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getGetRewardArrayInfo(provider: ContractProvider, receiver: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(receiver);
        let source = (await provider.get('get_RewardArray_info', builder.build())).stack;
        const result = loadTupleAppend(source);
        return result;
    }

    async getGetRewardArrayLenght(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_RewardArrayLenght', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

}
