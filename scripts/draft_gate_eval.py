import json,sys,re
def ev(files):
    rows=[]
    for f in files:
        d=json.load(open(f)); 
        d=d.get('data',d)
        for p in d['products']['nodes']:
            v=p['variants']['nodes']; m=p['media']['nodes']; f_=[]
            t=len(p['title']); st=len(p['seo']['title'] or p['title']); md=len(p['seo']['description'] or '')
            if not 45<=t<=70: f_.append(f'title {t}')
            if st>70 or st<30: f_.append(f'seo title {st}')
            if not 120<=md<=160: f_.append(f'meta {md}')
            if not p['productType']: f_.append('no type')
            if not any(x.startswith('CJ pid') or x.startswith('cj-pid') for x in p['tags']): f_.append('no pid tag')
            if sum(1 for x in m if x['mediaContentType']=='IMAGE')<10: f_.append(f"{sum(1 for x in m if x['mediaContentType']=='IMAGE')} images")
            if any(x['status']!='READY' for x in m): f_.append('media not READY')
            if any(not (x['alt'] or '').strip() or re.fullmatch(r'(view|image|photo)\s*\d*',(x['alt'] or '').strip().lower()) for x in m): f_.append('alt missing/generic')
            if not v: f_.append('no variants')
            for x in v:
                w=x['inventoryItem']['measurement']['weight']
                if not w or not w['value']: f_.append('weight'); break
            if any((x['deliveryProfile'] or {}).get('name')!='CJ Dropshipping Fulfillment' for x in v): f_.append('delivery profile')
            if any(not x['sku'] for x in v): f_.append('sku')
            if any(not x['media']['nodes'] for x in v): f_.append('variant w/o picture')
            inv=False
            for x in v:
                for l in x['inventoryItem']['inventoryLevels']['nodes']:
                    if l['location']['name'].lower().startswith('cjdropshipping'): inv=True
            if not inv: f_.append('no cj inventory location')
            if len(v)>8: f_.append(f'{len(v)} variants')
            rows.append((p['title'][:48],len(v),f_))
    return rows
if __name__=='__main__':
    r=ev(sys.argv[1:]); ok=sum(1 for x in r if not x[2])
    print(len(r),'drafts, clean on all automated checks:',ok)
    for t,n,f in r:
        if f: print('-',t,'|',n,'var |','; '.join(f))
