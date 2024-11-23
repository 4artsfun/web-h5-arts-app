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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type LogEventMintRecord = {
    $$type: 'LogEventMintRecord';
    minter: Address;
    item_id: bigint;
    generate_number: bigint;
}

export function storeLogEventMintRecord(src: LogEventMintRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2743565669, 32);
        b_0.storeAddress(src.minter);
        b_0.storeInt(src.item_id, 257);
        b_0.storeInt(src.generate_number, 257);
    };
}

export function loadLogEventMintRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2743565669) { throw Error('Invalid prefix'); }
    let _minter = sc_0.loadAddress();
    let _item_id = sc_0.loadIntBig(257);
    let _generate_number = sc_0.loadIntBig(257);
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
    let _minter = source.readAddress();
    let _item_id = source.readBigNumber();
    let _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.minter);
    builder.writeNumber(source.item_id);
    builder.writeNumber(source.generate_number);
    return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLogEventMintRecord(src)).endCell());
        },
        parse: (src) => {
            return loadLogEventMintRecord(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _collection_content = sc_0.loadRef();
    let _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}
export function eqQueryId(slice: Slice,queryId:bigint) {
    try {
        let sc_0 = slice;
        if (sc_0.loadUint(32) !== 3576854235) { return false }
        let _query_id = sc_0.loadUintBig(64);
        return queryId==_query_id;
    }catch (e){
        return false;
    }
}
export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadAddress();
    let _individual_content = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type CreateJettonRoot = {
    $$type: 'CreateJettonRoot';
    init_data: Cell;
}

export function storeCreateJettonRoot(src: CreateJettonRoot) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1374466498, 32);
        b_0.storeRef(src.init_data);
    };
}

export function loadCreateJettonRoot(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1374466498) { throw Error('Invalid prefix'); }
    let _init_data = sc_0.loadRef();
    return { $$type: 'CreateJettonRoot' as const, init_data: _init_data };
}

function loadTupleCreateJettonRoot(source: TupleReader) {
    let _init_data = source.readCell();
    return { $$type: 'CreateJettonRoot' as const, init_data: _init_data };
}

function storeTupleCreateJettonRoot(source: CreateJettonRoot) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.init_data);
    return builder.build();
}

function dictValueParserCreateJettonRoot(): DictionaryValue<CreateJettonRoot> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateJettonRoot(src)).endCell());
        },
        parse: (src) => {
            return loadCreateJettonRoot(src.loadRef().beginParse());
        }
    }
}

export type CreateNftCollection = {
    $$type: 'CreateNftCollection';
    royalty_params: RoyaltyParams;
    collectionContent: Cell;
    identityFilePath: Cell;
}

export function storeCreateNftCollection(src: CreateNftCollection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(22, 32);
        b_0.store(storeRoyaltyParams(src.royalty_params));
        b_0.storeRef(src.collectionContent);
        b_0.storeRef(src.identityFilePath);
    };
}

export function loadCreateNftCollection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 22) { throw Error('Invalid prefix'); }
    let _royalty_params = loadRoyaltyParams(sc_0);
    let _collectionContent = sc_0.loadRef();
    let _identityFilePath = sc_0.loadRef();
    return { $$type: 'CreateNftCollection' as const, royalty_params: _royalty_params, collectionContent: _collectionContent, identityFilePath: _identityFilePath };
}

function loadTupleCreateNftCollection(source: TupleReader) {
    const _royalty_params = loadTupleRoyaltyParams(source.readTuple());
    let _collectionContent = source.readCell();
    let _identityFilePath = source.readCell();
    return { $$type: 'CreateNftCollection' as const, royalty_params: _royalty_params, collectionContent: _collectionContent, identityFilePath: _identityFilePath };
}

function storeTupleCreateNftCollection(source: CreateNftCollection) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleRoyaltyParams(source.royalty_params));
    builder.writeCell(source.collectionContent);
    builder.writeCell(source.identityFilePath);
    return builder.build();
}

function dictValueParserCreateNftCollection(): DictionaryValue<CreateNftCollection> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateNftCollection(src)).endCell());
        },
        parse: (src) => {
            return loadCreateNftCollection(src.loadRef().beginParse());
        }
    }
}

export type UpdateNftCollection = {
    $$type: 'UpdateNftCollection';
    index: bigint;
    identityFilePath: Cell;
}

export function storeUpdateNftCollection(src: UpdateNftCollection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2852594140, 32);
        b_0.storeInt(src.index, 8);
        b_0.storeRef(src.identityFilePath);
    };
}

export function loadUpdateNftCollection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2852594140) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(8);
    let _identityFilePath = sc_0.loadRef();
    return { $$type: 'UpdateNftCollection' as const, index: _index, identityFilePath: _identityFilePath };
}

function loadTupleUpdateNftCollection(source: TupleReader) {
    let _index = source.readBigNumber();
    let _identityFilePath = source.readCell();
    return { $$type: 'UpdateNftCollection' as const, index: _index, identityFilePath: _identityFilePath };
}

function storeTupleUpdateNftCollection(source: UpdateNftCollection) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeCell(source.identityFilePath);
    return builder.build();
}

function dictValueParserUpdateNftCollection(): DictionaryValue<UpdateNftCollection> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateNftCollection(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateNftCollection(src.loadRef().beginParse());
        }
    }
}

export type CollectionOwnerUpdate = {
    $$type: 'CollectionOwnerUpdate';
    index: bigint;
    address: Address;
}

export function storeCollectionOwnerUpdate(src: CollectionOwnerUpdate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(750727764, 32);
        b_0.storeInt(src.index, 8);
        b_0.storeAddress(src.address);
    };
}

export function loadCollectionOwnerUpdate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 750727764) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(8);
    let _address = sc_0.loadAddress();
    return { $$type: 'CollectionOwnerUpdate' as const, index: _index, address: _address };
}

function loadTupleCollectionOwnerUpdate(source: TupleReader) {
    let _index = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'CollectionOwnerUpdate' as const, index: _index, address: _address };
}

function storeTupleCollectionOwnerUpdate(source: CollectionOwnerUpdate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserCollectionOwnerUpdate(): DictionaryValue<CollectionOwnerUpdate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionOwnerUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionOwnerUpdate(src.loadRef().beginParse());
        }
    }
}

export type MinterOwnerUpdate = {
    $$type: 'MinterOwnerUpdate';
    address: Address;
}

export function storeMinterOwnerUpdate(src: MinterOwnerUpdate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3017800406, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadMinterOwnerUpdate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3017800406) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'MinterOwnerUpdate' as const, address: _address };
}

function loadTupleMinterOwnerUpdate(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'MinterOwnerUpdate' as const, address: _address };
}

function storeTupleMinterOwnerUpdate(source: MinterOwnerUpdate) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserMinterOwnerUpdate(): DictionaryValue<MinterOwnerUpdate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMinterOwnerUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadMinterOwnerUpdate(src.loadRef().beginParse());
        }
    }
}

export type WithCollection = {
    $$type: 'WithCollection';
    index: bigint;
}

export function storeWithCollection(src: WithCollection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1003481040, 32);
        b_0.storeInt(src.index, 8);
    };
}

export function loadWithCollection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1003481040) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(8);
    return { $$type: 'WithCollection' as const, index: _index };
}

function loadTupleWithCollection(source: TupleReader) {
    let _index = source.readBigNumber();
    return { $$type: 'WithCollection' as const, index: _index };
}

function storeTupleWithCollection(source: WithCollection) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserWithCollection(): DictionaryValue<WithCollection> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithCollection(src)).endCell());
        },
        parse: (src) => {
            return loadWithCollection(src.loadRef().beginParse());
        }
    }
}

export type MintIdentity = {
    $$type: 'MintIdentity';
    collectionIndex: bigint;
    queryId: bigint;
}

export function storeMintIdentity(src: MintIdentity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2247791401, 32);
        b_0.storeInt(src.collectionIndex, 8);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadMintIdentity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2247791401) { throw Error('Invalid prefix'); }
    let _collectionIndex = sc_0.loadIntBig(8);
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'MintIdentity' as const, collectionIndex: _collectionIndex, queryId: _queryId };
}

function loadTupleMintIdentity(source: TupleReader) {
    let _collectionIndex = source.readBigNumber();
    let _queryId = source.readBigNumber();
    return { $$type: 'MintIdentity' as const, collectionIndex: _collectionIndex, queryId: _queryId };
}

function storeTupleMintIdentity(source: MintIdentity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.collectionIndex);
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserMintIdentity(): DictionaryValue<MintIdentity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintIdentity(src)).endCell());
        },
        parse: (src) => {
            return loadMintIdentity(src.loadRef().beginParse());
        }
    }
}

export type MintWorks = {
    $$type: 'MintWorks';
    queryId: bigint;
    collectionIndex: bigint;
    metaDataFilePath: Cell;
}

export function storeMintWorks(src: MintWorks) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(20, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeInt(src.collectionIndex, 8);
        b_0.storeRef(src.metaDataFilePath);
    };
}

export function loadMintWorks(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 20) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _collectionIndex = sc_0.loadIntBig(8);
    let _metaDataFilePath = sc_0.loadRef();
    return { $$type: 'MintWorks' as const, queryId: _queryId, collectionIndex: _collectionIndex, metaDataFilePath: _metaDataFilePath };
}

function loadTupleMintWorks(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _collectionIndex = source.readBigNumber();
    let _metaDataFilePath = source.readCell();
    return { $$type: 'MintWorks' as const, queryId: _queryId, collectionIndex: _collectionIndex, metaDataFilePath: _metaDataFilePath };
}

function storeTupleMintWorks(source: MintWorks) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.collectionIndex);
    builder.writeCell(source.metaDataFilePath);
    return builder.build();
}

function dictValueParserMintWorks(): DictionaryValue<MintWorks> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintWorks(src)).endCell());
        },
        parse: (src) => {
            return loadMintWorks(src.loadRef().beginParse());
        }
    }
}

export type MintCollectionMessage = {
    $$type: 'MintCollectionMessage';
    queryId: bigint;
    nftOwner: Address;
    metaDataFilePath: Cell;
}

export function storeMintCollectionMessage(src: MintCollectionMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(21, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.nftOwner);
        b_0.storeRef(src.metaDataFilePath);
    };
}

export function loadMintCollectionMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 21) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _nftOwner = sc_0.loadAddress();
    let _metaDataFilePath = sc_0.loadRef();
    return { $$type: 'MintCollectionMessage' as const, queryId: _queryId, nftOwner: _nftOwner, metaDataFilePath: _metaDataFilePath };
}

function loadTupleMintCollectionMessage(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _nftOwner = source.readAddress();
    let _metaDataFilePath = source.readCell();
    return { $$type: 'MintCollectionMessage' as const, queryId: _queryId, nftOwner: _nftOwner, metaDataFilePath: _metaDataFilePath };
}

function storeTupleMintCollectionMessage(source: MintCollectionMessage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.nftOwner);
    builder.writeCell(source.metaDataFilePath);
    return builder.build();
}

function dictValueParserMintCollectionMessage(): DictionaryValue<MintCollectionMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintCollectionMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMintCollectionMessage(src.loadRef().beginParse());
        }
    }
}

export type MintCollectionOwnerUpdateMessage = {
    $$type: 'MintCollectionOwnerUpdateMessage';
    address: Address;
}

export function storeMintCollectionOwnerUpdateMessage(src: MintCollectionOwnerUpdateMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(23, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadMintCollectionOwnerUpdateMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 23) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'MintCollectionOwnerUpdateMessage' as const, address: _address };
}

function loadTupleMintCollectionOwnerUpdateMessage(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'MintCollectionOwnerUpdateMessage' as const, address: _address };
}

function storeTupleMintCollectionOwnerUpdateMessage(source: MintCollectionOwnerUpdateMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserMintCollectionOwnerUpdateMessage(): DictionaryValue<MintCollectionOwnerUpdateMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintCollectionOwnerUpdateMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMintCollectionOwnerUpdateMessage(src.loadRef().beginParse());
        }
    }
}

export type MintCollectionwithdrawalMessage = {
    $$type: 'MintCollectionwithdrawalMessage';
    address: Address;
}

export function storeMintCollectionwithdrawalMessage(src: MintCollectionwithdrawalMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(24, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadMintCollectionwithdrawalMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 24) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'MintCollectionwithdrawalMessage' as const, address: _address };
}

function loadTupleMintCollectionwithdrawalMessage(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'MintCollectionwithdrawalMessage' as const, address: _address };
}

function storeTupleMintCollectionwithdrawalMessage(source: MintCollectionwithdrawalMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserMintCollectionwithdrawalMessage(): DictionaryValue<MintCollectionwithdrawalMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintCollectionwithdrawalMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMintCollectionwithdrawalMessage(src.loadRef().beginParse());
        }
    }
}

export type NftCollectionRecord = {
    $$type: 'NftCollectionRecord';
    address: Address;
    identityFilePath: Cell;
}

export function storeNftCollectionRecord(src: NftCollectionRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeRef(src.identityFilePath);
    };
}

export function loadNftCollectionRecord(slice: Slice) {
    let sc_0 = slice;
    let _address = sc_0.loadAddress();
    let _identityFilePath = sc_0.loadRef();
    return { $$type: 'NftCollectionRecord' as const, address: _address, identityFilePath: _identityFilePath };
}

function loadTupleNftCollectionRecord(source: TupleReader) {
    let _address = source.readAddress();
    let _identityFilePath = source.readCell();
    return { $$type: 'NftCollectionRecord' as const, address: _address, identityFilePath: _identityFilePath };
}

function storeTupleNftCollectionRecord(source: NftCollectionRecord) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeCell(source.identityFilePath);
    return builder.build();
}

function dictValueParserNftCollectionRecord(): DictionaryValue<NftCollectionRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftCollectionRecord(src)).endCell());
        },
        parse: (src) => {
            return loadNftCollectionRecord(src.loadRef().beginParse());
        }
    }
}

 type ServiceNftMinter_init_args = {
    $$type: 'ServiceNftMinter_init_args';
    owner: Address;
}

function initServiceNftMinter_init_args(src: ServiceNftMinter_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function ServiceNftMinter_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initServiceNftMinter_init_args({ $$type: 'ServiceNftMinter_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ServiceNftMinter_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
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
    12010: { message: `not enough money` },
    27499: { message: `initialized tx need from collection` },
    49280: { message: `not owner` },
    49469: { message: `not from collection` },
    62742: { message: `non-sequential NFTs` },
}

const ServiceNftMinter_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LogEventMintRecord","header":2743565669,"fields":[{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"generate_number","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CreateJettonRoot","header":1374466498,"fields":[{"name":"init_data","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"CreateNftCollection","header":22,"fields":[{"name":"royalty_params","type":{"kind":"simple","type":"RoyaltyParams","optional":false}},{"name":"collectionContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"identityFilePath","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"UpdateNftCollection","header":2852594140,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"identityFilePath","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CollectionOwnerUpdate","header":750727764,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MinterOwnerUpdate","header":3017800406,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithCollection","header":1003481040,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":8}}]},
    {"name":"MintIdentity","header":2247791401,"fields":[{"name":"collectionIndex","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"MintWorks","header":20,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"collectionIndex","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"metaDataFilePath","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MintCollectionMessage","header":21,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"nftOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metaDataFilePath","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MintCollectionOwnerUpdateMessage","header":23,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MintCollectionwithdrawalMessage","header":24,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftCollectionRecord","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"identityFilePath","type":{"kind":"simple","type":"cell","optional":false}}]},
]

const ServiceNftMinter_getters: ABIGetter[] = [
    {"name":"get_index","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_address_by_index","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getNftItemInit","arguments":[{"name":"msg","type":{"kind":"simple","type":"CreateNftCollection","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
]

const ServiceNftMinter_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateNftCollection"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateNftCollection"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintIdentity"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintWorks"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"withMinter"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithCollection"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MinterOwnerUpdate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CollectionOwnerUpdate"}},
]

export class ServiceNftMinter implements Contract {

    static async init(owner: Address) {
        return await ServiceNftMinter_init(owner);
    }

    static async fromInit(owner: Address) {
        const init = await ServiceNftMinter_init(owner);
        const address = contractAddress(0, init);
        return new ServiceNftMinter(address, init);
    }

    static fromAddress(address: Address) {
        return new ServiceNftMinter(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ServiceNftMinter_types,
        getters: ServiceNftMinter_getters,
        receivers: ServiceNftMinter_receivers,
        errors: ServiceNftMinter_errors,
    };

     constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateNftCollection | UpdateNftCollection | MintIdentity | MintWorks | null | 'withMinter' | WithCollection | MinterOwnerUpdate | CollectionOwnerUpdate) {

        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateNftCollection') {
            body = beginCell().store(storeCreateNftCollection(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateNftCollection') {
            body = beginCell().store(storeUpdateNftCollection(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintIdentity') {
            body = beginCell().store(storeMintIdentity(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintWorks') {
            body = beginCell().store(storeMintWorks(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message === 'withMinter') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithCollection') {
            body = beginCell().store(storeWithCollection(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MinterOwnerUpdate') {
            body = beginCell().store(storeMinterOwnerUpdate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CollectionOwnerUpdate') {
            body = beginCell().store(storeCollectionOwnerUpdate(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }

        await provider.internal(via, { ...args, body: body });

    }

    async getGetIndex(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_index', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getGetAddressByIndex(provider: ContractProvider, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('get_address_by_index', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }

    async getGetNftItemInit(provider: ContractProvider, msg: CreateNftCollection, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeTuple(storeTupleCreateNftCollection(msg));
        builder.writeNumber(index);
        let source = (await provider.get('getNftItemInit', builder.build())).stack;
        const result = loadTupleStateInit(source);
        return result;
    }

}
