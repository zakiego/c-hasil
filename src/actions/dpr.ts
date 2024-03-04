import { dbClient, dbSchema } from "@/db";
import { ENDPOINT_FUNCTION } from "@/endpoint";
import { options } from "@/index";
import { createConcurrentManager } from "@/utils/concurrent";
import { logger } from "@/utils/log";
import { initCli } from "@/utils/progress";
import { nullGuard } from "@/utils/type";
import { asc, eq, inArray, sql } from "drizzle-orm";

// const QUERY_TPS = dbClient.query.pdprTps;
// const QUERY_DAPIL = dbClient.query.pdprDapilList;
// const TPS_SCHEMA = dbSchema.pdprTps;
// const DAPIL_LIST_SCHEMA = dbSchema.pdprDapilList;
// const DAPIL_CALON_LIST_SCHEMA = dbSchema.pdprDapilCalonList;
// const FECTH_TPS = ENDPOINT_FUNCTION.dpr.getTpsDetail;
// const FETCH_DAPIL_LIST = ENDPOINT_FUNCTION.dpr.getDapilList;
// const FETCH_DAPIL_CALON_LIST = ENDPOINT_FUNCTION.dpr.getDapilCalonList;
// const FETCH_DAPIL_CALON_DETAIL = ENDPOINT_FUNCTION.dpr.getDapilCalonDetail;

// const COLUMN_IS_FETCHED = dbSchema.wilayah.is_fetched_dpr;

// const insertTpsDetail = async () => {
//   const listTps = await dbClient.query.wilayah.findMany({
//     where: (table, { eq, and }) =>
//       and(eq(table.tingkat, 5), eq(COLUMN_IS_FETCHED, false)),
//     columns: {
//       kode: true,
//     },
//     limit: options.limit,
//   });

//   const count = listTps.length;

//   logger.info(`Successfully queried data for TPS: ${listTps.length} rows`);

//   const concurrent = createConcurrentManager();

//   for (let i = 0; i < listTps.length; i++) {
//     concurrent.queue(async () => {
//       const tps = listTps[i];

//       const response = await FECTH_TPS(tps.kode);

//       logger.info(
//         `${i + 1}/${count} - Successfully fetched data for TPS: ${tps.kode}`,
//       );

//       const insert_and_update_is_fetched = await dbClient.transaction(
//         async (trx) => {
//           const insert = await trx.insert(TPS_SCHEMA).values({
//             kode: tps.kode,
//             provinsi_kode: tps.kode.substring(0, 2),
//             kabupaten_kota_kode: tps.kode.substring(0, 4),
//             kecamatan_kode: tps.kode.substring(0, 6),
//             kelurahan_desa_kode: tps.kode.substring(0, 10),
//             tps: tps.kode.substring(10, 13),

//             suara_partai_1: nullGuard(response.chart?.["1"]),
//             suara_partai_2: nullGuard(response.chart?.["2"]),
//             suara_partai_3: nullGuard(response.chart?.["3"]),
//             suara_partai_4: nullGuard(response.chart?.["4"]),
//             suara_partai_5: nullGuard(response.chart?.["5"]),
//             suara_partai_6: nullGuard(response.chart?.["6"]),
//             suara_partai_7: nullGuard(response.chart?.["7"]),
//             suara_partai_8: nullGuard(response.chart?.["8"]),
//             suara_partai_9: nullGuard(response.chart?.["9"]),
//             suara_partai_10: nullGuard(response.chart?.["10"]),
//             suara_partai_11: nullGuard(response.chart?.["11"]),
//             suara_partai_12: nullGuard(response.chart?.["12"]),
//             suara_partai_13: nullGuard(response.chart?.["13"]),
//             suara_partai_14: nullGuard(response.chart?.["14"]),
//             suara_partai_15: nullGuard(response.chart?.["15"]),
//             suara_partai_16: nullGuard(response.chart?.["16"]),
//             suara_partai_17: nullGuard(response.chart?.["17"]),
//             suara_partai_18: nullGuard(response.chart?.["18"]),
//             suara_partai_19: nullGuard(response.chart?.["19"]),
//             suara_partai_20: nullGuard(response.chart?.["20"]),
//             suara_partai_21: nullGuard(response.chart?.["21"]),
//             suara_partai_22: nullGuard(response.chart?.["22"]),
//             suara_partai_23: nullGuard(response.chart?.["23"]),
//             suara_partai_24: nullGuard(response.chart?.["24"]),

//             images: response.images.map((image) => image ?? ""),
//             suara_sah: response.administrasi?.suara_sah,
//             suara_total: response.administrasi?.suara_total,
//             pemilih_dpt_j: response.administrasi?.pemilih_dpt_j,
//             pemilih_dpt_l: response.administrasi?.pemilih_dpt_l,
//             pemilih_dpt_p: response.administrasi?.pemilih_dpt_p,
//             pengguna_dpt_j: response.administrasi?.pengguna_dpt_j,
//             pengguna_dpt_l: response.administrasi?.pengguna_dpt_l,
//             pengguna_dpt_p: response.administrasi?.pengguna_dpt_p,
//             pengguna_dptb_j: response.administrasi?.pengguna_dptb_j,
//             pengguna_dptb_l: response.administrasi?.pengguna_dptb_l,
//             pengguna_dptb_p: response.administrasi?.pengguna_dptb_p,
//             suara_tidak_sah: response.administrasi?.suara_tidak_sah,
//             pengguna_total_j: response.administrasi?.pengguna_total_j,
//             pengguna_total_l: response.administrasi?.pengguna_total_l,
//             pengguna_total_p: response.administrasi?.pengguna_total_p,
//             pengguna_non_dpt_j: response.administrasi?.pengguna_non_dpt_j,
//             pengguna_non_dpt_l: response.administrasi?.pengguna_non_dpt_l,
//             pengguna_non_dpt_p: response.administrasi?.pengguna_non_dpt_p,
//             psu: response.psu,
//             ts: response.ts,
//             status_suara: response.chart !== null,
//             status_adm: response.administrasi !== null,

//             fetch_count: 1,
//             updated_at: new Date(),
//             created_at: new Date(),
//           });

//           const update_is_fetched = await trx
//             .update(dbSchema.wilayah)
//             .set({
//               is_fetched_dpr: true, // ADJUST THIS!!!!
//               updated_at: new Date(),
//             })
//             .where(eq(dbSchema.wilayah.kode, tps.kode));

//           return insert;
//         },
//       );

//       logger.info(
//         `${i + 1}/${count} - Successfully inserted data for TPS: ${tps.kode}`,
//       );
//     });
//   }

//   await concurrent.run();

//   process.exit(0);
// };

// const insertTpsDetailV2 = async () => {
//   const listTps = await dbClient.query.wilayah.findMany({
//     where: (table, { eq, and }) =>
//       and(eq(table.tingkat, 5), eq(COLUMN_IS_FETCHED, false)),
//     columns: {
//       kode: true,
//     },
//     limit: options.limit,
//   });
//   const count = listTps.length;

//   logger.info(`Successfully queried data for TPS: ${count} rows`);

//   const concurrent = createConcurrentManager();

//   const batching = 100;
//   const batch = [] as (typeof listTps)[];

//   // push tps to batch
//   for (let i = 0; i < listTps.length; i++) {
//     // push every 10 tps to batch
//     if (i % batching === 0) {
//       batch.push(listTps.slice(i, i + batching));
//     }
//   }

//   const countBatch = batch.length;

//   // loop through batch
//   for (let i = 0; i < countBatch; i++) {
//     concurrent.queue(async () => {
//       const singleBatch = batch[i];
//       const bucketResponse = [] as Array<
//         Awaited<ReturnType<typeof FECTH_TPS>> & {
//           kode: string;
//         }
//       >;

//       for (const tps of singleBatch) {
//         const response = await FECTH_TPS(tps.kode);

//         bucketResponse.push({ ...response, kode: tps.kode });
//       }

//       const insert_and_update_is_fetched = await dbClient.transaction(
//         async (trx) => {
//           const insert = await trx.insert(TPS_SCHEMA).values(
//             bucketResponse.map((response, i) => {
//               return {
//                 kode: response.kode,
//                 provinsi_kode: response.kode.substring(0, 2),
//                 kabupaten_kota_kode: response.kode.substring(0, 4),
//                 kecamatan_kode: response.kode.substring(0, 6),
//                 kelurahan_desa_kode: response.kode.substring(0, 10),
//                 tps: response.kode.substring(10, 13),

//                 suara_partai_1: nullGuard(response.chart?.["1"]),
//                 suara_partai_2: nullGuard(response.chart?.["2"]),
//                 suara_partai_3: nullGuard(response.chart?.["3"]),
//                 suara_partai_4: nullGuard(response.chart?.["4"]),
//                 suara_partai_5: nullGuard(response.chart?.["5"]),
//                 suara_partai_6: nullGuard(response.chart?.["6"]),
//                 suara_partai_7: nullGuard(response.chart?.["7"]),
//                 suara_partai_8: nullGuard(response.chart?.["8"]),
//                 suara_partai_9: nullGuard(response.chart?.["9"]),
//                 suara_partai_10: nullGuard(response.chart?.["10"]),
//                 suara_partai_11: nullGuard(response.chart?.["11"]),
//                 suara_partai_12: nullGuard(response.chart?.["12"]),
//                 suara_partai_13: nullGuard(response.chart?.["13"]),
//                 suara_partai_14: nullGuard(response.chart?.["14"]),
//                 suara_partai_15: nullGuard(response.chart?.["15"]),
//                 suara_partai_16: nullGuard(response.chart?.["16"]),
//                 suara_partai_17: nullGuard(response.chart?.["17"]),
//                 suara_partai_18: nullGuard(response.chart?.["18"]),
//                 suara_partai_19: nullGuard(response.chart?.["19"]),
//                 suara_partai_20: nullGuard(response.chart?.["20"]),
//                 suara_partai_21: nullGuard(response.chart?.["21"]),
//                 suara_partai_22: nullGuard(response.chart?.["22"]),
//                 suara_partai_23: nullGuard(response.chart?.["23"]),
//                 suara_partai_24: nullGuard(response.chart?.["24"]),

//                 images: response.images.map((image) => image ?? ""),
//                 suara_sah: response.administrasi?.suara_sah,
//                 suara_total: response.administrasi?.suara_total,
//                 pemilih_dpt_j: response.administrasi?.pemilih_dpt_j,
//                 pemilih_dpt_l: response.administrasi?.pemilih_dpt_l,
//                 pemilih_dpt_p: response.administrasi?.pemilih_dpt_p,
//                 pengguna_dpt_j: response.administrasi?.pengguna_dpt_j,
//                 pengguna_dpt_l: response.administrasi?.pengguna_dpt_l,
//                 pengguna_dpt_p: response.administrasi?.pengguna_dpt_p,
//                 pengguna_dptb_j: response.administrasi?.pengguna_dptb_j,
//                 pengguna_dptb_l: response.administrasi?.pengguna_dptb_l,
//                 pengguna_dptb_p: response.administrasi?.pengguna_dptb_p,
//                 suara_tidak_sah: response.administrasi?.suara_tidak_sah,
//                 pengguna_total_j: response.administrasi?.pengguna_total_j,
//                 pengguna_total_l: response.administrasi?.pengguna_total_l,
//                 pengguna_total_p: response.administrasi?.pengguna_total_p,
//                 pengguna_non_dpt_j: response.administrasi?.pengguna_non_dpt_j,
//                 pengguna_non_dpt_l: response.administrasi?.pengguna_non_dpt_l,
//                 pengguna_non_dpt_p: response.administrasi?.pengguna_non_dpt_p,
//                 psu: response.psu,
//                 ts: response.ts,
//                 status_suara: response.chart !== null,
//                 status_adm: response.administrasi !== null,

//                 fetch_count: 1,
//                 updated_at: new Date(),
//                 created_at: new Date(),
//               };
//             }),
//           );

//           const update_is_fetched = await trx
//             .update(dbSchema.wilayah)
//             .set({
//               is_fetched_dpr: true, // ADJUST THIS!!!!
//               updated_at: new Date(),
//             })
//             .where(
//               inArray(
//                 dbSchema.wilayah.kode,
//                 singleBatch.map((x) => x.kode),
//               ),
//             );
//         },
//       );

//       logger.info(
//         `${
//           i + 1
//         }/${countBatch} - Successfully inserted data for TPS: ${singleBatch
//           .map((x) => x.kode)
//           .join(", ")}`,
//       );
//     });
//   }

//   await concurrent.run();

//   process.exit(0);
// };

// const updateTpsDetail = async () => {
//   const listTps = await QUERY_TPS.findMany({
//     orderBy: (table, { asc }) => asc(table.updated_at),
//     columns: {
//       kode: true,
//     },
//     limit: options.limit,
//   });
//   const count = listTps.length;

//   logger.info(`Successfully queried data for TPS: ${listTps.length} rows`);

//   const concurrent = createConcurrentManager();

//   for (let i = 0; i < listTps.length; i++) {
//     concurrent.queue(async () => {
//       const tps = listTps[i];

//       const response = await FECTH_TPS(tps.kode);

//       logger.info(
//         `${i + 1}/${count} - Successfully fetched data for TPS: ${tps.kode}`,
//       );

//       const insert_and_update_is_fetched = await dbClient.transaction(
//         async (trx) => {
//           const update = await trx
//             .update(TPS_SCHEMA)
//             .set({
//               suara_partai_1: nullGuard(response.chart?.["1"]),
//               suara_partai_2: nullGuard(response.chart?.["2"]),
//               suara_partai_3: nullGuard(response.chart?.["3"]),
//               suara_partai_4: nullGuard(response.chart?.["4"]),
//               suara_partai_5: nullGuard(response.chart?.["5"]),
//               suara_partai_6: nullGuard(response.chart?.["6"]),
//               suara_partai_7: nullGuard(response.chart?.["7"]),
//               suara_partai_8: nullGuard(response.chart?.["8"]),
//               suara_partai_9: nullGuard(response.chart?.["9"]),
//               suara_partai_10: nullGuard(response.chart?.["10"]),
//               suara_partai_11: nullGuard(response.chart?.["11"]),
//               suara_partai_12: nullGuard(response.chart?.["12"]),
//               suara_partai_13: nullGuard(response.chart?.["13"]),
//               suara_partai_14: nullGuard(response.chart?.["14"]),
//               suara_partai_15: nullGuard(response.chart?.["15"]),
//               suara_partai_16: nullGuard(response.chart?.["16"]),
//               suara_partai_17: nullGuard(response.chart?.["17"]),
//               suara_partai_18: nullGuard(response.chart?.["18"]),
//               suara_partai_19: nullGuard(response.chart?.["19"]),
//               suara_partai_20: nullGuard(response.chart?.["20"]),
//               suara_partai_21: nullGuard(response.chart?.["21"]),
//               suara_partai_22: nullGuard(response.chart?.["22"]),
//               suara_partai_23: nullGuard(response.chart?.["23"]),
//               suara_partai_24: nullGuard(response.chart?.["24"]),

//               images: response.images.map((image) => image ?? ""),
//               suara_sah: response.administrasi?.suara_sah,
//               suara_total: response.administrasi?.suara_total,
//               pemilih_dpt_j: response.administrasi?.pemilih_dpt_j,
//               pemilih_dpt_l: response.administrasi?.pemilih_dpt_l,
//               pemilih_dpt_p: response.administrasi?.pemilih_dpt_p,
//               pengguna_dpt_j: response.administrasi?.pengguna_dpt_j,
//               pengguna_dpt_l: response.administrasi?.pengguna_dpt_l,
//               pengguna_dpt_p: response.administrasi?.pengguna_dpt_p,
//               pengguna_dptb_j: response.administrasi?.pengguna_dptb_j,
//               pengguna_dptb_l: response.administrasi?.pengguna_dptb_l,
//               pengguna_dptb_p: response.administrasi?.pengguna_dptb_p,
//               suara_tidak_sah: response.administrasi?.suara_tidak_sah,
//               pengguna_total_j: response.administrasi?.pengguna_total_j,
//               pengguna_total_l: response.administrasi?.pengguna_total_l,
//               pengguna_total_p: response.administrasi?.pengguna_total_p,
//               pengguna_non_dpt_j: response.administrasi?.pengguna_non_dpt_j,
//               pengguna_non_dpt_l: response.administrasi?.pengguna_non_dpt_l,
//               pengguna_non_dpt_p: response.administrasi?.pengguna_non_dpt_p,
//               psu: response.psu,
//               ts: response.ts,

//               status_suara: response.chart !== null,
//               status_adm: response.administrasi !== null,

//               updated_at: new Date(),
//               fetch_count: sql`${TPS_SCHEMA.fetch_count} + 1`,
//             })
//             .where(eq(TPS_SCHEMA.kode, tps.kode))
//             .returning();

//           return update;
//         },
//       );

//       logger.info(
//         `${i + 1}/${count} - Successfully updated data for TPS: ${tps.kode}`,
//       );
//     });
//   }

//   await concurrent.run();

//   process.exit(0);
// };

// const insertDapilList = async () => {
//   const response = await FETCH_DAPIL_LIST();
//   logger.info(`Successfully fetched data for Dapil: ${response.length} rows`);

//   const insert = await dbClient
//     .insert(DAPIL_LIST_SCHEMA)
//     .values(response)
//     .onConflictDoNothing()
//     .returning();

//   logger.info(`Successfully inserted data for Dapil: ${insert.length} rows`);

//   process.exit(0);
// };

// const getDapilCalonList = async () => {
//   const listDapil = await QUERY_DAPIL.findMany({
//     orderBy: (table, { asc }) => asc(table.updated_at),
//     where: (table, { eq, and }) => and(eq(table.is_calon_fetched, false)),
//     columns: {
//       kode: true,
//     },
//     limit: options.limit,
//   });

//   const count = listDapil.length;

//   logger.info(`Successfully queried data for Dapil: ${count} rows`);

//   const concurrent = createConcurrentManager();

//   for (let i = 0; i < listDapil.length; i++) {
//     concurrent.queue(async () => {
//       const dapil = listDapil[i];

//       const response = await FETCH_DAPIL_CALON_LIST(dapil.kode);

//       logger.info(
//         `${i + 1}/${count} - Successfully fetched data for Dapil: ${
//           dapil.kode
//         }`,
//       );

//       const insert_and_update_is_fetched = await dbClient.transaction(
//         async (trx) => {
//           const insert = await trx
//             .insert(DAPIL_CALON_LIST_SCHEMA)
//             .values(response);
//           // .onConflictDoNothing()
//           // .returning();

//           const update_is_fetched = await trx
//             .update(DAPIL_LIST_SCHEMA)
//             .set({
//               is_calon_fetched: true,
//               updated_at: new Date(),
//             })
//             .where(eq(DAPIL_LIST_SCHEMA.kode, dapil.kode));

//           return insert;
//         },
//       );

//       logger.info(
//         `${i + 1}/${count} - Successfully inserted ${
//           insert_and_update_is_fetched.length
//         } data for Dapil: ${dapil.kode}`,
//       );
//     });
//   }

//   await concurrent.run();

//   process.exit(0);
// };

// const updateDapilCalonDetail = async () => {
//   // await dbClient.delete(DAPIL_CALON_LIST_SCHEMA);
//   // await dbClient.delete(DAPIL_LIST_SCHEMA);

//   const listDapil = await QUERY_DAPIL.findMany({
//     orderBy: (table, { asc }) => asc(table.updated_at),
//     columns: {
//       kode: true,
//     },
//     limit: options.limit,
//   });

//   const count = listDapil.length;

//   logger.info(`Successfully queried data for Dapil: ${count} rows`);

//   const concurrent = createConcurrentManager();

//   for (let i = 0; i < listDapil.length; i++) {
//     concurrent.queue(async () => {
//       const dapil = listDapil[i];
//       const response = await FETCH_DAPIL_CALON_DETAIL(dapil.kode);

//       logger.info(
//         `${i + 1}/${count} - Successfully fetched data for Dapil: ${
//           dapil.kode
//         }`,
//       );

//       const insert_and_update_is_fetched = await dbClient.transaction(
//         async (trx) => {
//           // update each calon
//           for (const calon of response) {
//             if (!calon) return;

//             await trx
//               .update(DAPIL_CALON_LIST_SCHEMA)
//               .set({
//                 ts: calon.ts,
//                 jumlah_suara: calon.jumlah_suara,
//                 updated_at: new Date(),
//               })
//               .where(eq(DAPIL_CALON_LIST_SCHEMA.calon_id, calon.calon_id));
//           }

//           // update dapil
//           const update_fetched_count = await trx
//             .update(DAPIL_LIST_SCHEMA)
//             .set({
//               fetch_count: sql`${DAPIL_LIST_SCHEMA.fetch_count} + 1`,
//               updated_at: new Date(),
//             })
//             .where(eq(DAPIL_LIST_SCHEMA.kode, dapil.kode));

//           return;
//         },
//       );

//       logger.info(
//         `${i + 1}/${count} - Successfully inserted data for Dapil: ${
//           dapil.kode
//         }`,
//       );
//     });
//   }

//   await concurrent.run();

//   process.exit(0);
// };

const FETCH_DAPIL_CALON_LIST = ENDPOINT_FUNCTION.dpr.getDapilCalonList;
const FECTH_TPS = ENDPOINT_FUNCTION.dpr.getTpsDetail;

const SCHEMA_DAPIL_CALON_LIST = dbSchema.pdprCalonList;
const SCHEMA_TPS_LIST = dbSchema.pdprTpsList;
const SCHEMA_TPS_CALEG = dbSchema.pdprTpsCaleg;
const SCHEMA_TPS_PARTAI = dbSchema.pdprTpsPartai;
const SCHEMA_TPS_ADMINISTRASI = dbSchema.pdprTpsAdministrasi;

const QUERY_TPS = dbClient.query.pdprTpsList;

const initTpsList = async () => {
  await dbClient.execute(sql`
  INSERT INTO ${SCHEMA_TPS_LIST} (id, kode, nama, tingkat, updated_at, created_at)
  SELECT id, kode, nama, tingkat, updated_at, created_at
  FROM ${dbSchema.wilayah}
  WHERE tingkat = 5
  ON CONFLICT (kode) DO NOTHING
  `);

  logger.info("Successfully inserted TPS list");

  process.exit(0);
};

const getCalonList = async () => {
  const listDapil = await dbClient.query.wilayah.findMany({
    where: (table, { eq, and }) => and(eq(table.tingkat, 2)),
    columns: {
      kode: true,
    },
    limit: options.limit,
  });

  const count = listDapil.length;

  logger.info(`Successfully queried data for Dapil: ${count} rows`);

  const concurrent = createConcurrentManager();

  const cli = initCli({
    total: count,
  });

  for (let i = 0; i < count; i++) {
    concurrent.queue(async () => {
      const dapil = listDapil[i];
      const orderId = `${i + 1}/${count}`;

      cli.increment();

      const response = await FETCH_DAPIL_CALON_LIST(dapil.kode).then((res) => {
        logger.info(
          `${orderId} - Successfully fetched data for Dapil: ${dapil.kode}`,
        );
        return res;
      });

      if (!response) {
        return;
      }

      const insert_and_update_is_fetched = await dbClient.transaction(
        async (trx) => {
          const insert = await trx
            .insert(SCHEMA_DAPIL_CALON_LIST)
            .values(response)
            .onConflictDoUpdate({
              target: SCHEMA_DAPIL_CALON_LIST.calon_id,
              set: {
                nama: sql`EXCLUDED.nama`,
                nomor_urut: sql`EXCLUDED.nomor_urut`,
                jenis_kelamin: sql`EXCLUDED.jenis_kelamin`,
                tempat_tinggal: sql`EXCLUDED.tempat_tinggal`,
              },
            })
            .returning();

          const update_is_fetched = await trx
            .update(dbSchema.wilayah)
            .set({
              is_fetched_dpr: true,
            })
            .where(eq(dbSchema.wilayah.kode, dapil.kode));

          return insert;
        },
      );

      logger.info(
        `${i + 1}/${count} - Successfully inserted data for Dapil: ${
          dapil.kode
        } with ${insert_and_update_is_fetched.length} rows`,
      );
    });
  }

  await concurrent.run();

  process.exit(0);
};

const getTpsDetail = async () => {
  const listTPS = await QUERY_TPS.findMany({
    columns: {
      kode: true,
    },
    limit: options.limit,
    orderBy: asc(SCHEMA_TPS_LIST.updated_at),
  });

  const count = listTPS.length;

  logger.info(`Successfully queried data for TPS: ${listTPS.length} rows`);

  const concurrent = createConcurrentManager();

  const cli = initCli({
    total: count,
  });

  for (let i = 0; i < listTPS.length; i++) {
    concurrent.queue(async () => {
      const tps = listTPS[i];
      const orderId = `${i + 1}/${count}`;

      const response = await FECTH_TPS(tps.kode);

      logger.info(
        `${orderId} - Successfully fetched data for TPS: ${tps.kode}`,
      );

      const insert_and_update = await dbClient
        .transaction(async (trx) => {
          if (response.suaraCaleg.length > 0) {
            // --- Insert TPS Caleg
            await trx
              .insert(SCHEMA_TPS_CALEG)
              .values(
                response.suaraCaleg.map((suara) => ({
                  calon_id: suara.calon_id,
                  tps: tps.kode,
                  jumlah_suara: suara.jumlah_suara,
                  ts: response.ts,
                })),
              )
              .onConflictDoUpdate({
                target: [SCHEMA_TPS_CALEG.tps, SCHEMA_TPS_CALEG.calon_id],
                set: {
                  jumlah_suara: sql`EXCLUDED.jumlah_suara`,
                  ts: sql`EXCLUDED.ts`,
                  fetch_count: sql`${SCHEMA_TPS_CALEG.fetch_count} + 1`,
                  updated_at: new Date(),
                },
              })
              .catch((e) => {
                console.log("Error on insert TPS Caleg", e);
                throw e;
              });
          }

          // --- Insert TPS Partai

          if (response.suaraPartai && response.suaraPartai.length > 0) {
            await trx
              .insert(SCHEMA_TPS_PARTAI)
              .values(
                response.suaraPartai.map((suara) => ({
                  partai_id: suara.partai_id,
                  tps: tps.kode,
                  jumlah_suara_partai: suara.jumlah_suara_partai,
                  jumlah_suara_total: suara.jumlah_suara_total,
                  ts: response.ts,
                })),
              )
              .onConflictDoUpdate({
                target: [SCHEMA_TPS_PARTAI.tps, SCHEMA_TPS_PARTAI.partai_id],
                set: {
                  jumlah_suara_partai: sql`EXCLUDED.jumlah_suara_partai`,
                  jumlah_suara_total: sql`EXCLUDED.jumlah_suara_total`,
                  ts: sql`EXCLUDED.ts`,
                  fetch_count: sql`${SCHEMA_TPS_PARTAI.fetch_count} + 1`,
                  updated_at: new Date(),
                },
              })
              .catch((e) => {
                console.log("Error on insert TPS Partai", e);
                throw e;
              });
          }

          // --- Insert TPS Administrasi
          await trx
            .insert(SCHEMA_TPS_ADMINISTRASI)
            .values({
              tps: tps.kode,

              images: response.images.map((image) => image ?? ""),
              suara_sah: response.administrasi?.suara_sah,
              suara_total: response.administrasi?.suara_total,
              pemilih_dpt_j: response.administrasi?.pemilih_dpt_j,
              pemilih_dpt_l: response.administrasi?.pemilih_dpt_l,
              pemilih_dpt_p: response.administrasi?.pemilih_dpt_p,
              pengguna_dpt_j: response.administrasi?.pengguna_dpt_j,
              pengguna_dpt_l: response.administrasi?.pengguna_dpt_l,
              pengguna_dpt_p: response.administrasi?.pengguna_dpt_p,
              pengguna_dptb_j: response.administrasi?.pengguna_dptb_j,
              pengguna_dptb_l: response.administrasi?.pengguna_dptb_l,
              pengguna_dptb_p: response.administrasi?.pengguna_dptb_p,
              suara_tidak_sah: response.administrasi?.suara_tidak_sah,
              pengguna_total_j: response.administrasi?.pengguna_total_j,
              pengguna_total_l: response.administrasi?.pengguna_total_l,
              pengguna_total_p: response.administrasi?.pengguna_total_p,
              pengguna_non_dpt_j: response.administrasi?.pengguna_non_dpt_j,
              pengguna_non_dpt_l: response.administrasi?.pengguna_non_dpt_l,
              pengguna_non_dpt_p: response.administrasi?.pengguna_non_dpt_p,
              ts: response.ts,
              psu: response.psu,

              created_at: new Date(),
              updated_at: new Date(),
            })
            .onConflictDoUpdate({
              target: SCHEMA_TPS_ADMINISTRASI.tps,
              set: {
                images: response.images.map((image) => image ?? ""),
                suara_sah: response.administrasi?.suara_sah,
                suara_total: response.administrasi?.suara_total,
                pemilih_dpt_j: response.administrasi?.pemilih_dpt_j,
                pemilih_dpt_l: response.administrasi?.pemilih_dpt_l,
                pemilih_dpt_p: response.administrasi?.pemilih_dpt_p,
                pengguna_dpt_j: response.administrasi?.pengguna_dpt_j,
                pengguna_dpt_l: response.administrasi?.pengguna_dpt_l,
                pengguna_dpt_p: response.administrasi?.pengguna_dpt_p,
                pengguna_dptb_j: response.administrasi?.pengguna_dptb_j,
                pengguna_dptb_l: response.administrasi?.pengguna_dptb_l,
                pengguna_dptb_p: response.administrasi?.pengguna_dptb_p,
                suara_tidak_sah: response.administrasi?.suara_tidak_sah,
                pengguna_total_j: response.administrasi?.pengguna_total_j,
                pengguna_total_l: response.administrasi?.pengguna_total_l,
                pengguna_total_p: response.administrasi?.pengguna_total_p,
                pengguna_non_dpt_j: response.administrasi?.pengguna_non_dpt_j,
                pengguna_non_dpt_l: response.administrasi?.pengguna_non_dpt_l,
                pengguna_non_dpt_p: response.administrasi?.pengguna_non_dpt_p,
                ts: response.ts,
                psu: response.psu,

                fetch_count: sql`${SCHEMA_TPS_ADMINISTRASI.fetch_count} + 1`,
                updated_at: new Date(),
              },
            })
            .catch((e) => {
              console.log("Error on insert TPS Administrasi", e);
              throw e;
            });

          // --- Update TPS List
          await trx
            .update(SCHEMA_TPS_LIST)
            .set({
              updated_at: new Date(),
              fetch_count: sql`${SCHEMA_TPS_LIST.fetch_count} + 1`,
            })
            .where(eq(SCHEMA_TPS_LIST.kode, tps.kode))
            .catch((e) => {
              console.log("Error on update TPS List", e);
              throw e;
            });

          cli.increment();
        })
        .catch((e) => {
          console.log("Error on transaction", e);
          throw e;
        });

      logger.info(
        `${orderId} - Successfully updated data for TPS: ${tps.kode}`,
      );
    });
  }

  await concurrent.run();

  process.exit(0);
};

export const dprActions = {
  // insertTpsDetail,
  // insertTpsDetailV2,
  // updateTpsDetail,
  // insertDapilList,
  // getDapilCalonList,
  // updateDapilCalonDetail,
  initTpsList,
  getCalonList,
  getTpsDetail,
};
